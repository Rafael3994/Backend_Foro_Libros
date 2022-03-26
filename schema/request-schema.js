const yup = require("yup");
var ObjectId = require('mongoose').Types.ObjectId;


exports.userLoginSchema = yup.object({
  body: yup.object({
    //TODO: Traducir
    email: yup.string().email('Pon un formato de correo correcto.').required('Pon un correo.'),
    password: yup
      .string()
      //TODO: Traducir
      .required('Pon tu contraseña. Please Enter your password')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        //TODO: Traducir
        "La contraseña debe contener 8 caracteres, Una mayuscula, Una minuscula, Un numero y un caracter especial. Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
  })
});

exports.userParamsIdSchema = yup.object({
  body: yup.object({
    idUser: yup
      .string()
      .test("is-uuid", "${path} is not uuid", value => ObjectId.isValid(value))
  }),
});


exports.userRegisterSchema = yup.object({
  body: yup.object({
    //TODO: Traducir
    name: yup.string().min(3, 'longestName').max(32, 'Reduce el nombre').required('Pon un nombre.'),
    password: yup
      .string()
      //TODO: Traducir
      .required('Pon tu contraseña. Please Enter your password')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        //TODO: Traducir
        "La contraseña debe contener 8 caracteres, Una mayuscula, Una minuscula, Un numero y un caracter especial. Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    //TODO: Traducir
    email: yup.string().email('Pon un formato de correo correcto.').required('Pon un correo.')
  }),
});

exports.userUpdateSchema = yup.object({
  body: yup.object({
    name: yup.string().notRequired().min(3, 'longestName').nullable().transform((value) => !!value ? value : null).max(32, 'Reduce el nombre'),
    password: yup.string().notRequired()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        //TODO: Traducir
        {
          message: "La contraseña debe contener 8 caracteres, Una mayuscula, Una minuscula, Un numero y un caracter especial. Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
          excludeEmptyString: true
        }

      ),
    //TODO: Traducir
    email: yup.string().email('Pon un formato de correo correcto.')
  })
});