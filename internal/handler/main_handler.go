package handler

import (
	"net/http"

	"github.com/gorilla/mux"

	"test/web-skeleton/internal/handler/api"
	"test/web-skeleton/internal/handler/view"
)

/*
New create a handler, which will combine the api handler
and the view handler for frontend serving.

If api handler is == nil it will run without it.
If view handler is == nil it will run without it.
*/
func New(api *api.Handler, view *view.Handler) http.Handler {
	router := mux.NewRouter()

	//Set the router of the api handler if exist.
	if api != nil {
		api.SetRoute(router)
	}

	//Set the router of the api handler if exist.
	if view != nil {
		view.SetRoute(router)
	}

	return router
}
