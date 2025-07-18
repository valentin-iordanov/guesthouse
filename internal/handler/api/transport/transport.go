package transport

// Health Responses
type AlivenessResponse struct {
	Up bool `json:"up"`
}

type ReadinessResponse struct {
	Up bool `json:"up"`
}
