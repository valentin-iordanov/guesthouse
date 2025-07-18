package api

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"test/web-skeleton/internal/handler/api/transport"

	"github.com/gorilla/mux"
	"go.uber.org/zap"
)

type Handler struct {
	service Service
	router  *mux.Router
	logger  *zap.Logger
}

type Service interface{}

func NewHandler(service Service, logger *zap.Logger) *Handler {
	if logger == nil {
		log.Fatal("logger is nil")
	}

	h := &Handler{
		service: service,
		logger:  logger,
	}

	logger.Debug("use SetRouter to set the router")
	return h
}

// SetRoute set a router if router is not set it will panic.
func (h *Handler) SetRoute(r *mux.Router) {
	logger := h.logger.With(zap.String("function", "SetRoute"))
	if h.router != nil {
		logger.Warn("Router is already set")
		return
	}
	h.router = r
	h.routes()
}

func (h *Handler) routes() {
	routeAPI := h.router.NewRoute().PathPrefix("/api/v1").Subrouter()

	//Health endpoints
	routeAPI.Methods(GET).Path("/aliveness").HandlerFunc(h.aliveness)
	routeAPI.Methods(GET).Path("/readiness").HandlerFunc(h.readiness)
}

func (h *Handler) aliveness(w http.ResponseWriter, r *http.Request) {
	response := transport.AlivenessResponse{Up: true}
	h.jsonResponse(w, response)
}

func (h *Handler) readiness(w http.ResponseWriter, r *http.Request) {
	response := transport.ReadinessResponse{Up: true}
	h.jsonResponse(w, response)
}

func (h *Handler) jsonResponse(w http.ResponseWriter, data any) {
	logger := h.logger.With(zap.String("function", "jsonEncoder"))

	w.Header().Set("Content-Type", "application/json")

	if err := json.NewEncoder(w).Encode(data); err != nil {
		message := fmt.Sprintf("cannot encode the data: %v", data)
		logger.Error(message, zap.Error(err))

		w.WriteHeader(http.StatusInternalServerError)
	}
}
