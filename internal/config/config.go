package config

type Config struct {
	HTTP_Server ServerConfig

	LoggerLevel string `envconfig:"LOGGER_LEVEL" default:"INFO"`
}

type ServerConfig struct {
	Port string `envconfig:"HTTP_SERVER_PORT"`
	Host string `envconfig:"HTTP_SERVER_HOST"`
}

// Example:
// type Specification struct {
//     ManualOverride1 string `envconfig:"manual_override_1"`
//     DefaultVar      string `default:"foobar"`
//     RequiredVar     string `required:"true"`
//     IgnoredVar      string `ignored:"true"`
//     AutoSplitVar    string `split_words:"true"`
//     RequiredAndAutoSplitVar    string `required:"true" split_words:"true"`
// }
