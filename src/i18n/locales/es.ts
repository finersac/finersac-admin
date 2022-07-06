const locale = {
  translation: {
    error: {
      generic: "Hubo un error, por favor intente de nuevo",
      auth_error: "Correo o contraseña incorrectos",
      email_required: "El email es requerido",
      repassword_required: "La confirmacion contraseña es requerida",
      password_not_match: "La confirmacion no coincide con la contraseña",
      password_required: "La contraseña es requerida",
      first_name_required: "El nombre es requerido",
      last_name_required: "El apellido es requerido",
      weight_required: "El peso es requerido",
      height_required: "La altura es requerida",
      user_already_exists: "El usuario existe",
      user_not_exist: "El usuario no existe",
      failed_to_update_user: "Hubo un error al actualizar el usuario",
      passwordExpired:
        "El tiempo para cambiar su contraseña ha expirado, solicite cambiar su contraseña nuevamente",
    },
    success: {
      emailSend:
        "Se envió un un correo electrónico para recuperar su contraseña",
      passwordChanged:
        "La contraseña se cambió con éxito, haga click en el siguiente botón para iniciar sesión",
      user_created: "Se creó el usuario correctamente",
      user_updated: "Se actualizó el usuario con éxito",
      user_deleted: "Se eliminó al usuario con éxito",
      user_blocked: "El usuario fue bloqueado con éxito.",
      user_unlocked: "El usuario fue desbloqueado con éxito.",
    },
    info: {},
    common: {
      email: "Correo Electrónico",
      password: "Contraseña",
      rePassword: "Repetir contraseña",
      signIn: "Ingresar",
      forgotPassword: "¿Has olvidado tu contraseña?",
      copyright: "@Copyright. Reservados todos los derechos.",
      goToLogin: "ir a iniciar sesión",
      rememberMe: "Recuérdame",
      recoverPassword: "Recuperar contraseña",
      changePassword: "Cambiar contraseña",
      search: "Buscar",
      confirm: "Confirmar",
      sureDelete: "¿Estás segura de eliminar?",
      sureDeleteItems:
        "¿Está seguro de que desea eliminar los elementos seleccionados?",
      coach: "Entrenador",
      athlete: "Atleta",
      emptyResult: "No se encontraron resultados",
      emptyList: "Sin resultados",
    },
    sideBar: {
      dashboard: "Panel Principal",
      users: "Usuarios",
      planning: "Planificación",
      templates: "Plantillas",
      exercises: "Ejercicios",
      settings: "Configuración",
      logOut: "Cerrar Sesión",
      account: "Cuenta",
      myAthletes: "Mis Atletas",
    },
    dataTable: {
      first_name: "Nombre",
      last_name: "Apellido",
      email: "Correo electrónico",
      weight: "Peso",
      height: "Altura",
      country: "País",
      role: "Role",
      coaches: "Entrenadores",
      selectCoach: "Selecciona un entrenador",
      emptyCoaches: "No hay entrenadores disponibles",
    },
    button: {
      save: "Guardar",
      update: "Actualizar",
      create: "Crear",
      delete: "Eliminar",
      cancel: "Cancelar",
      createUser: "Nuevo Usuario",
      no: "No",
      yes: "Sí",
    },
    role: {
      superadmin: "super admin",
      admin: "admin",
      coach: "entrenador/a",
      athlete: "atleta",
    },
  },
};

export default locale;
