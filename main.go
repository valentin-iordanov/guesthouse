package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os/signal"
	"runtime"
	"syscall"
	"time"

	"github.com/kelseyhightower/envconfig"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"

	"test/web-skeleton/internal/config"
	"test/web-skeleton/internal/handler"
	"test/web-skeleton/internal/handler/api"
	"test/web-skeleton/internal/handler/view"
)

//This skeleton has
//logger = zap.Logger
//struct config parser = envconfig
//golang server = http.Server{}

//TODO: add database sqlLite with xorm

func main() {
	// config loader
	cfg, err := newConfig()
	if err != nil {
		log.Fatal("new config failed with error: ", err)
	}

	//logger
	logger, err := newLogger(cfg.LoggerLevel)
	if err != nil {
		log.Fatal("new logger failed with error: ", err)
	}

	//Handlers
	viewHandler := view.NewHandler(logger)
	apiHandler := api.NewHandler(nil, logger)

	h := handler.New(apiHandler, viewHandler)

	serverRunAndShutdownGracefully(h, cfg.HTTP_Server, logger)
}

// newConfig reads all environment variables from the .env file and maps them to a Go struct.
func newConfig() (*config.Config, error) {
	cfg := config.Config{}
	err := envconfig.Process("", &cfg)
	if err != nil {
		return nil, err
	}
	return &cfg, nil
}

// newLogger create a structured logger with very high performance
func newLogger(loggerStackTraceLevel string) (*zap.Logger, error) {
	level, err := zapcore.ParseLevel(loggerStackTraceLevel)
	if err != nil {
		log.Printf("cannot parse level: %v", level)
		return nil, err
	}

	logger, err := zap.NewProduction(zap.AddStacktrace(level))
	if err != nil {
		log.Printf("can't initialize zap logger: %v", err)
		return nil, err
	}

	return logger, err
}

// serverRun config the server and starts it.
func serverRunAndShutdownGracefully(handler http.Handler, server config.ServerConfig, logger *zap.Logger) {
	srv := http.Server{
		Addr:    server.Host + ":" + server.Port,
		Handler: handler,
	}

	go func() {
		err := srv.ListenAndServe()
		if err != nil {
			logger.Error("server will shut down gracefully", zap.Error(err))
		}
	}()
	fmt.Printf("server %v:%v start", server.Host, server.Port)

	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGTERM, syscall.SIGINT)
	defer stop()

	<-ctx.Done()

	ctxWithTimeout, cancel := context.WithTimeout(context.Background(), time.Duration(time.Second*30))
	defer cancel()
	if err := srv.Shutdown(ctxWithTimeout); err != nil {
		logger.Error("server shutdown gracefully failed", zap.Error(err))
	}
	logger.Info("successful graceful shut down on the server")

	waitForGoroutines(time.Second * 30)
}

func waitForGoroutines(timeout time.Duration) {
	maxChecks := int(timeout / time.Second)
	for i := 0; i < maxChecks; i++ {
		count := runtime.NumGoroutine()
		fmt.Printf("Check %d: %d goroutines alive\n", i+1, count)
		if count <= 2 { // only the main goroutine remains
			fmt.Println("All goroutines shut down successfully")
			return
		}
		time.Sleep(1 * time.Second)
	}
	fmt.Println("Timeout reached; some goroutines are still running")
}
