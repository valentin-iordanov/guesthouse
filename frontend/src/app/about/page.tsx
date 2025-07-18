import Hello from "../components/hello";

export default function About() {
  return (
    <div>
      <header>
        <h1 className="text-3xl text-center my-6" tabIndex={0}>
          About
        </h1>
        <p className="text-center text-lg text-gray-600">
          Learn more about our app and scroll down to see dynamic content below.
        </p>
      </header>

      {/* Filler content to create scrolling */}
      <main>
        <section
          aria-labelledby="filler-content-heading"
          className="h-[200vh] bg-gray-100"
        >
          <h2
            id="filler-content-heading"
            className="text-center text-2xl text-gray-700 pt-4"
            tabIndex={0}
          >
            Filler Content
          </h2>
          <p className="text-center text-gray-600">
            This section is here to create space. Scroll down to see more.
          </p>
        </section>

        {/* Dynamic content with Hello component */}
        <section
          aria-labelledby="dynamic-content-heading"
          className="bg-gray-50 py-8"
        >
          <h2
            id="dynamic-content-heading"
            className="text-center text-2xl text-gray-700"
            tabIndex={0}
          >
            Dynamic Content
          </h2>
          <Hello />
        </section>
      </main>

      <footer className="text-center text-gray-500 py-4">
        <p>&copy; 2025 My App. All rights reserved.</p>
      </footer>
    </div>
  );
}
