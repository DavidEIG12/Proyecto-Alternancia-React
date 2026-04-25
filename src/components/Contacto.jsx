function Contacto() {
  return (
    <section className="page">
      <h2>Contacto</h2>
      <p>Completa el formulario para enviarnos tu consulta.</p>

      {/* Se evita submit real porque en este ejercicio no hay backend conectado. */}
      <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="nombre">Nombre</label>
        <input id="nombre" name="nombre" type="text" placeholder="Tu nombre" required />

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="nombre@correo.com" required />

        <label htmlFor="mensaje">Mensaje</label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows="5"
          placeholder="Escribe aqui tu mensaje"
          required
        />

        <button type="submit">Enviar</button>
      </form>
    </section>
  )
}

export default Contacto
