const galleryItems = [
  {
    title: 'Diseno Web',
    description: 'Interfaces modernas y adaptadas a movil para proyectos reales.',
  },
  {
    title: 'Apps React',
    description: 'Desarrollo de aplicaciones SPA con componentes reutilizables.',
  },
  {
    title: 'Mantenimiento',
    description: 'Mejora continua, refactorizacion y optimizacion de rendimiento.',
  },
]

const posts = [
  {
    title: 'Como estructurar componentes en React',
    summary: 'Separar por responsabilidad mejora la escalabilidad y el mantenimiento.',
  },
  {
    title: 'Ventajas de React Router',
    summary: 'Permite navegacion fluida en SPA sin recargar toda la aplicacion.',
  },
]

function Servicios() {
  return (
    <section className="page">
      <h2>Servicios</h2>

      <div className="grid-layout">
        <article>
          <h3>Galeria</h3>
          <div className="gallery">
            {/* El contenido se genera desde datos para evitar duplicacion de JSX. */}
            {galleryItems.map((item) => (
              <div className="card" key={item.title}>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </article>

        <article>
          <h3>Blog</h3>
          <div className="blog-list">
            {/* Key estable para que React reconcilie correctamente cada entrada. */}
            {posts.map((post) => (
              <div className="post" key={post.title}>
                <h4>{post.title}</h4>
                <p>{post.summary}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}

export default Servicios
