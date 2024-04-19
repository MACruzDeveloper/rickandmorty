import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

// fields validation with Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  comment: Yup.string().required('Comment is required'),
})

const initialValues = {
  name: '',
  email: '',
  comment: ''
}

const FormComments = () => {
  // post form data to a fake endpoint
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch('https://api.example.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      })

      if (response.ok) {
        console.log('Form submitted:', values)
      } else {
        console.error('An error occurred while submitting the form.')
      }
    } catch (error) {
      console.error('An error occurred while submitting the form.', error)
    }
    setSubmitting(false)
  }

  return <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
  >
    {({
      isSubmitting,
    }) => (
      <Form noValidate>
        <fieldset className="mb-4">
          <Field
            type="text"
            id="name"
            name="name"
            className="form_control"
            placeholder="Escribe tu nombre"
          />
          <ErrorMessage name="name">
            {msg => <span className="error">{msg}</span>}
          </ErrorMessage>
        </fieldset>

        <fieldset className="mb-4">
          <Field
            type="email"
            id="email"
            name="email"
            className="form_control"
            placeholder="Escribe tu email"
          />
          <ErrorMessage name="email">
            {msg => <span className="error">{msg}</span>}
          </ErrorMessage>
        </fieldset>

        <fieldset className="mb-4">
          <Field
            component="textarea"
            id="comment"
            name="comment"
            className="form_control"
            maxLength="500"
            rows="4"
            placeholder="Escribe tu comentario (max. 500 caracteres)"
          />
          <ErrorMessage name="comment">
            {msg => <span className="error">{msg}</span>}
          </ErrorMessage>
        </fieldset>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn bg-color"
        >
          Enviar
        </button>
      </Form>
    )}
  </Formik>
}

export default FormComments