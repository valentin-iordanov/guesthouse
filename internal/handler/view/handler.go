package view

import (
	"bytes"
	"compress/gzip"
	"fmt"
	"io"
	"io/fs"
	"net/http"
	"strings"
	"test/web-skeleton/frontend"
	"time"

	"github.com/gorilla/mux"
	"go.uber.org/zap"
)

type Handler struct {
	router *mux.Router
	logger *zap.Logger
}

func NewHandler(logger *zap.Logger) *Handler {
	h := &Handler{logger: logger}

	logger.Debug("use SetRouter to set the router")
	return h
}

func (h *Handler) routes() {
	routeView := h.router.NewRoute().PathPrefix("/")
	routeView.Methods(http.MethodGet).HandlerFunc(h.render)
}

func (h *Handler) render(w http.ResponseWriter, r *http.Request) {
	h.logger.With(zap.String("function", "render"))

	path := r.URL.Path
	splitPath := strings.Split(path, "/")

	// Set Cache-Control headers for SVG and other static assets
	if strings.HasPrefix(path, "/_next/static/") || strings.HasPrefix(path, "/static/") || strings.HasSuffix(path, ".svg") {
		w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
	}

	fmt.Printf("path: %v\n", path)

	// Add "index.html" to paths without file extensions
	if !strings.Contains(path, ".") {
		lastPathSegment := splitPath[len(splitPath)-1]
		if lastPathSegment == "" {
			path = path + "index.html"
		} else {
			path = path + ".html"
		}
	}

	if strings.HasSuffix(path, ".svg") {
		w.Header().Set("Content-Type", "image/svg+xml")
	}

	// Open the file
	file, err := frontend.FrontEndFiles.Open("out" + path)
	if err != nil {
		http.NotFound(w, r)
		return
	}
	defer file.Close()

	// Read the file content
	content, err := io.ReadAll(file)
	if err != nil {
		http.Error(w, "Failed to read file", http.StatusInternalServerError)
		return
	}

	// Handle Gzip Compression
	if strings.Contains(r.Header.Get("Accept-Encoding"), "gzip") {
		w.Header().Set("Content-Encoding", "gzip")
		w.Header().Set("Vary", "Accept-Encoding") // Inform caches that encoding varies

		// Create a gzip writer and write gzipped content to the response
		gzippedWriter := gzip.NewWriter(w)
		defer gzippedWriter.Close()

		// Write the content to the gzip writer
		_, err = gzippedWriter.Write(content)
		if err != nil {
			http.Error(w, "Failed to write gzipped content", http.StatusInternalServerError)
			return
		}
		return
	}

	// Serve uncompressed content if Gzip is not supported
	http.ServeContent(w, r, path, time.Time{}, bytes.NewReader(content))
}

func DirWalking() {
	err := fs.WalkDir(frontend.FrontEndFiles, ".", func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		// Print each file or directory path
		if d.IsDir() {
			fmt.Printf("Directory: %s\n", path)
		} else {
			fmt.Printf("File: %s\n", path)
		}
		return nil
	})

	if err != nil {
		fmt.Printf("Error walking the file system: %v\n", err)
	}

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
