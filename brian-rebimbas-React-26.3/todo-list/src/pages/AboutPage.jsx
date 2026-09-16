function AboutPage() {
  return (
    <div className="simple-page">
      <div className="simple-card">
        <div className="simple-page-header">
          <h1>About Todo List</h1>
          <p>A simple way to organize and manage your tasks.</p>
        </div>

        <section>
          <h2>App Features</h2>

          <ul>
            <li>Create and manage todo items</li>
            <li>Update and complete todos</li>
            <li>Sort and filter your todos</li>
            <li>User authentication</li>
            <li>Protected routes for authenticated users</li>
          </ul>
        </section>

        <section>
          <h2>Technologies Used</h2>

          <ul>
            <li>React</li>
            <li>React Router</li>
            <li>Vite</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default AboutPage;
