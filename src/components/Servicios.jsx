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

const initialPosts = [
  {
    id: 1,
    title: 'Como estructurar componentes en React',
    description: 'Separar por responsabilidad mejora la escalabilidad y el mantenimiento.',
    isFeatured: false,
  },
  {
    id: 2,
    title: 'Ventajas de React Router',
    description: 'Permite navegacion fluida en SPA sin recargar toda la aplicacion.',
    isFeatured: false,
  },
]

function PostCard({ post, onDelete, onToggleFeatured, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draftTitle, setDraftTitle] = useState(post.title)
  const [draftDescription, setDraftDescription] = useState(post.description)

  function handleSave() {
    // Normaliza texto antes de guardar para evitar posts con solo espacios.
    const nextTitle = draftTitle.trim()
    const nextDescription = draftDescription.trim()

    if (!nextTitle || !nextDescription) return

    onUpdate(post.id, {
      title: nextTitle,
      description: nextDescription,
    })
    setIsEditing(false)
  }

  return (
    <article className={post.isFeatured ? 'post is-featured' : 'post'}>
      {isEditing ? (
        <div className="post-edit-form">
          <input
            type="text"
            value={draftTitle}
            onChange={(event) => setDraftTitle(event.target.value)}
            placeholder="Titulo del post"
          />
          <textarea
            rows="3"
            value={draftDescription}
            onChange={(event) => setDraftDescription(event.target.value)}
            placeholder="Descripcion del post"
          />
          <div className="post-actions">
            <button type="button" className="btn-primary" onClick={handleSave}>
              Guardar
            </button>
            <button type="button" className="btn-soft" onClick={() => setIsEditing(false)}>
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <>
          <h4>{post.title}</h4>
          <p>{post.description}</p>

          <div className="post-actions">
            <button type="button" className="btn-soft" onClick={() => setIsEditing(true)}>
              Editar
            </button>
            <button type="button" className="btn-soft" onClick={() => onDelete(post.id)}>
              Eliminar
            </button>
            <button
              type="button"
              className={post.isFeatured ? 'btn-primary' : 'btn-soft'}
              onClick={() => onToggleFeatured(post.id)}
            >
              {post.isFeatured ? 'Destacado' : 'Destacar'}
            </button>
          </div>
        </>
      )}
    </article>
  )
}

function Servicios() {
  const [selectedImageId, setSelectedImageId] = useState(galleryItems[0].id)
  const [posts, setPosts] = useState(initialPosts)
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalImage, setModalImage] = useState(null)

  // Se obtiene la imagen activa para renderizar una vista principal y su descripcion.
  const selectedImage = galleryItems.find((item) => item.id === selectedImageId)

  function handleOpenModal() {
    setModalImage(selectedImage)
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    setModalImage(null)
  }

  function handlePostChange(event) {
    const { name, value } = event.target

    // Actualiza el estado del formulario dinamicamente segun el campo editado.
    setNewPost((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleAddPost(event) {
    event.preventDefault()

    const title = newPost.title.trim()
    const description = newPost.description.trim()

    if (!title || !description) return

    // Se inserta el nuevo post al inicio para que el contenido recien creado sea visible al momento.
    setPosts((prev) => [
      {
        id: Date.now(),
        title,
        description,
        isFeatured: false,
      },
      ...prev,
    ])

    setNewPost({
      title: '',
      description: '',
    })
  }

  function handleDeletePost(postId) {
    // Elimina la publicacion seleccionada sin afectar al resto de elementos.
    setPosts((prev) => prev.filter((post) => post.id !== postId))
  }

  function handleToggleFeatured(postId) {
    // Activa o desactiva el estado destacado del post elegido en tiempo real.
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, isFeatured: !post.isFeatured } : post,
      ),
    )
  }

  function handleUpdatePost(postId, patch) {
    // Aplica cambios de edicion al post correspondiente conservando el resto.
    setPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, ...patch } : post)))
  }

  return (
    <section className="page">
      <h2>Servicios</h2>

      <div className="grid-layout">
        <article>
          <h3>Galeria</h3>

          {/* Renderizado condicional de la imagen principal segun la miniatura seleccionada. */}
          {selectedImage && (
            <div className="gallery-main fade-in" key={selectedImage.id}>
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt} 
                className="main-image"
                onClick={handleOpenModal}
                role="button"
                tabIndex="0"
                onKeyPress={(e) => e.key === 'Enter' && handleOpenModal()}
              />
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

          {/* Formulario CMS para crear nuevas publicaciones de forma dinamica. */}
          <form className="post-creator" onSubmit={handleAddPost}>
            <label htmlFor="post-title">Titulo</label>
            <input
              id="post-title"
              name="title"
              type="text"
              placeholder="Introduce un titulo"
              value={newPost.title}
              onChange={handlePostChange}
            />

            <label htmlFor="post-description">Descripcion</label>
            <textarea
              id="post-description"
              name="description"
              rows="3"
              placeholder="Describe brevemente la publicacion"
              value={newPost.description}
              onChange={handlePostChange}
            />

            <button type="submit" className="btn-primary" disabled={!newPost.title.trim() || !newPost.description.trim()}>
              Crear post
            </button>
          </form>

          <div className="blog-list">
            {/* Cada post se renderiza como componente independiente para encapsular acciones propias. */}
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onDelete={handleDeletePost}
                onToggleFeatured={handleToggleFeatured}
                onUpdate={handleUpdatePost}
              />
            ))}

            {!posts.length && <p>No hay publicaciones todavia.</p>}
          </div>
        </article>
      </div>

      {/* Modal para visualizar la imagen en grande */}
      {isModalOpen && modalImage && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close"
              onClick={handleCloseModal}
              aria-label="Cerrar modal"
            >
              ✕
            </button>
            <img src={modalImage.src} alt={modalImage.alt} className="modal-image" />
            <h3>{modalImage.title}</h3>
            <p>{modalImage.description}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default Servicios
