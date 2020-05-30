package handlers

import (
	"log"
	"net/http"
	"os"

	"github.com/book-library/internal/mid"
	"github.com/book-library/internal/platform/auth"
	"github.com/book-library/internal/platform/web"
	"github.com/jmoiron/sqlx"
)

// API constructs an http.Handler with all application routes defined.
func API(build string, shutdown chan os.Signal, log *log.Logger, db *sqlx.DB, authenticator *auth.Authenticator) http.Handler {

	// Construct the web.App which holds all routes as well as common Middleware.
	app := web.NewApp(shutdown, mid.Logger(log), mid.Errors(log), mid.Metrics(), mid.Panics(log))

	// Register health check endpoint. This route is not authenticated.
	check := Check{
		build: build,
		db:    db,
	}

	app.Handle("GET", "/v1/health", check.Health)

	// Register users management and authentication endpoints.
	u := User{
		db:            db,
		authenticator: authenticator,
	}

	app.Handle("GET", "/v1/users", u.List, mid.Authentication(authenticator), mid.HasRole(auth.RoleAdmin))
	app.Handle("POST", "/v1/users", u.Create, mid.Authentication(authenticator), mid.HasRole(auth.RoleAdmin))
	app.Handle("GET", "/v1/users/:id", u.Retrieve, mid.Authentication(authenticator), mid.HasRole(auth.RoleAdmin))
	app.Handle("PUT", "/v1/users/:id", u.Update, mid.Authentication(authenticator), mid.HasRole(auth.RoleAdmin))
	app.Handle("DELETE", "/v1/users/:id", u.Delete, mid.Authentication(authenticator), mid.HasRole(auth.RoleAdmin))
	app.Handle("GET", "/v1/users/me", u.RetrieveMe, mid.Authentication(authenticator), mid.HasRole(auth.RoleUser))

	// This route is not authenticated
	app.Handle("GET", "/v1/users/token", u.TokenAuthenticator)

	// Register books endpoints.
	bk := Book{
		db: db,
	}
	app.Handle("GET", "/v1/books", bk.List, mid.Authentication(authenticator))
	app.Handle("POST", "/v1/books", bk.Create, mid.Authentication(authenticator), mid.HasRole(auth.RoleAdmin))
	app.Handle("GET", "/v1/books/:id", bk.Retrieve, mid.Authentication(authenticator))
	app.Handle("PUT", "/v1/books/:id", bk.Update, mid.Authentication(authenticator), mid.HasRole(auth.RoleAdmin))
	app.Handle("DELETE", "/v1/books/:id", bk.Delete, mid.Authentication(authenticator), mid.HasRole(auth.RoleAdmin))

	// Register book-category endpoints.
	ct := BookCategory{
		db: db,
	}
	app.Handle("GET", "/v1/categories", ct.List, mid.Authentication(authenticator))
	app.Handle("POST", "/v1/categories", ct.Create, mid.Authentication(authenticator), mid.HasRole(auth.RoleAdmin))
	app.Handle("PUT", "/v1/categories/:id", ct.Update, mid.Authentication(authenticator), mid.HasRole(auth.RoleAdmin))
	app.Handle("DELETE", "/v1/categories/:id", ct.Delete, mid.Authentication(authenticator), mid.HasRole(auth.RoleAdmin))
	app.Handle("GET", "/v1/categories/:id", ct.Retreive, mid.Authentication(authenticator), mid.HasRole(auth.RoleUser))

	// Register loans endpoints.
	l := Loan{
		db: db,
	}
	app.Handle("GET", "/v1/loans", l.List, mid.Authentication(authenticator), mid.HasRole(auth.RoleUser))
	app.Handle("POST", "/v1/loans", l.Create, mid.Authentication(authenticator), mid.HasRole(auth.RoleUser))
	app.Handle("PUT", "/v1/loans/:id", l.Update, mid.Authentication(authenticator), mid.HasRole(auth.RoleUser))
	app.Handle("DELETE", "/v1/loans/:id", l.Delete, mid.Authentication(authenticator), mid.HasRole(auth.RoleUser))
	app.Handle("GET", "/v1/loans/:id", l.Retrieve, mid.Authentication(authenticator), mid.HasRole(auth.RoleUser))

	// statikFS, err := fs.New()
	// if err != nil {
	// 	panic(err)
	// }

	// staticServer := http.FileServer(statikFS)
	// sh := http.StripPrefix("/swaggerui/", staticServer)
	// app.Handle("GET", "/swaggerui/", web.Handler(sh))
	return app
}

// CreateRepoReq contains request data for create repo API
type CreateRepoReq struct {
	// Name of the repository
	Name string `json:"name"`
	// Public defines whether created repository should be public or not
	Public bool `json:"public"`
}
