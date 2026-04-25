import { useState } from 'react'

const galleryItems = [
  {
    id: 'diseno-web',
    title: 'Diseno Web',
    description: 'Interfaces modernas y adaptadas a movil para proyectos reales.',
    src: 'https://picsum.photos/id/1048/900/550',
    alt: 'Disenador trabajando en la interfaz de una pagina web.',
  },
  {
    id: 'apps-react',
    title: 'Apps React',
    description: 'Desarrollo de aplicaciones SPA con componentes reutilizables.',
    src: 'https://picsum.photos/id/180/900/550',
    alt: 'Portatil con codigo React y paneles de desarrollo.',
  },
  {
    id: 'mantenimiento',
    title: 'Mantenimiento',
    description: 'Mejora continua, refactorizacion y optimizacion de rendimiento.',
    src: 'https://picsum.photos/id/1/900/550',
    alt: 'Equipo revisando metricas y mantenimiento de una aplicacion.',
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
  const [selectedImageId, setSelectedImageId] = useState(galleryItems[0].id)

  // Se obtiene la imagen activa para renderizar una vista principal y su descripcion.
  const selectedImage = galleryItems.find((item) => item.id === selectedImageId)

  return (
    <section className="page">
      <h2>Servicios</h2>

      <div className="grid-layout">
        <article>
          <h3>Galeria</h3>

          {/* Renderizado condicional de la imagen principal segun la miniatura seleccionada. */}
          {selectedImage && (
            <div className="gallery-main fade-in" key={selectedImage.id}>
              <img src={selectedImage.src} alt={selectedImage.alt} className="main-image" />
              <h4>{selectedImage.title}</h4>
              <p>{selectedImage.description}</p>
            </div>
          )}

          <div className="gallery-thumbs" aria-label="Miniaturas de la galeria">
            {/* Cada miniatura actualiza el estado para cambiar dinamicamente la imagen principal. */}
            {galleryItems.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setSelectedImageId(item.id)}
                className={selectedImageId === item.id ? 'thumb is-selected' : 'thumb'}
                aria-label={`Ver imagen de ${item.title}`}
                aria-pressed={selectedImageId === item.id}
              >
                <img src={item.src} alt={item.alt} />
              </button>
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
