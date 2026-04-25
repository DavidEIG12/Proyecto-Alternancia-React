import { useState } from 'react'

const initialData = {
  nombre: '',
  email: '',
  mensaje: '',
}

const initialTouched = {
  nombre: false,
  email: false,
  mensaje: false,
}

// Valida un campo concreto y devuelve un mensaje de error o cadena vacia.
function validateField(name, value) {
  const trimmedValue = value.trim()

  if (name === 'nombre') {
    if (!trimmedValue) return 'El nombre es obligatorio.'
    if (trimmedValue.length < 2) return 'El nombre debe tener al menos 2 caracteres.'
    return ''
  }

  if (name === 'email') {
    if (!trimmedValue) return 'El email es obligatorio.'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmedValue)) return 'Introduce un email valido.'
    return ''
  }

  if (name === 'mensaje') {
    if (!trimmedValue) return 'El mensaje es obligatorio.'
    if (trimmedValue.length < 10) return 'El mensaje debe tener al menos 10 caracteres.'
    return ''
  }

  return ''
}

// Ejecuta todas las validaciones para simplificar comprobaciones globales del formulario.
function validateAll(formData) {
  return {
    nombre: validateField('nombre', formData.nombre),
    email: validateField('email', formData.email),
    mensaje: validateField('mensaje', formData.mensaje),
  }
}

function Contacto() {
  const [formData, setFormData] = useState(initialData)
  const [touched, setTouched] = useState(initialTouched)
  const [errors, setErrors] = useState(initialData)
  const [isSubmitted, setIsSubmitted] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Validacion en tiempo real para actualizar feedback al escribir.
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }))
  }

  function handleBlur(event) {
    const { name, value } = event.target

    // onBlur marca el campo como "tocado" para no mostrar errores antes de interactuar.
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    // En el envio se fuerzan todas las validaciones para evitar datos incompletos.
    const nextErrors = validateAll(formData)
    setErrors(nextErrors)

    setTouched({
      nombre: true,
      email: true,
      mensaje: true,
    })

    const hasErrors = Object.values(nextErrors).some(Boolean)
    if (hasErrors) {
      setIsSubmitted(false)
      return
    }

    // Si es valido, se muestra confirmacion y se limpia el formulario.
    setIsSubmitted(true)
    setFormData(initialData)
    setTouched(initialTouched)
    setErrors(initialData)
  }

  // Controla el estado del boton de envio en tiempo real.
  const isFormValid = Object.values(validateAll(formData)).every((error) => !error)

  function getFieldState(fieldName) {
    // Devuelve la clase CSS segun el estado de cada campo para feedback visual.
    if (!touched[fieldName]) return ''
    return errors[fieldName] ? 'is-invalid' : 'is-valid'
  }

  return (
    <section className="page">
      <h2>Contacto</h2>
      <p>Completa el formulario para enviarnos tu consulta.</p>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          placeholder="Tu nombre"
          value={formData.nombre}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getFieldState('nombre')}
          aria-invalid={Boolean(touched.nombre && errors.nombre)}
          aria-describedby="nombre-error"
        />
        {touched.nombre && errors.nombre && (
          <small id="nombre-error" className="field-error">
            {errors.nombre}
          </small>
        )}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="nombre@correo.com"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getFieldState('email')}
          aria-invalid={Boolean(touched.email && errors.email)}
          aria-describedby="email-error"
        />
        {touched.email && errors.email && (
          <small id="email-error" className="field-error">
            {errors.email}
          </small>
        )}

        <label htmlFor="mensaje">Mensaje</label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows="5"
          placeholder="Escribe aqui tu mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getFieldState('mensaje')}
          aria-invalid={Boolean(touched.mensaje && errors.mensaje)}
          aria-describedby="mensaje-error"
        />
        {touched.mensaje && errors.mensaje && (
          <small id="mensaje-error" className="field-error">
            {errors.mensaje}
          </small>
        )}

        <button type="submit" disabled={!isFormValid}>
          Enviar
        </button>
      </form>

      {isSubmitted && (
        <p className="form-success">Formulario enviado correctamente.</p>
      )}
    </section>
  )
}

export default Contacto
