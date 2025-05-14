import User from '../models/user-model.js';

//user registeration validation schema
export const userRegisterValidationSchema = {
    //validation for name field
    name:{
        in:['body'],
        exists:{
            errorMessage:'Name Field is Required'
        },
        notEmpty:{
            errorMessage:'Name field should not be empty'
        },
        trim:true
    },

    //validation for email filed
    email:{
        in:['body'],
        exists:{
            errorMessage:'email field is required'
        },
        notEmpty:{
            errorMessage:'email field should not be empty'
        },
        trim:true,
        normalizeEmail:true,

        custom:{
            options: async function (value) {
                try{
                    const user = await User.findOne({email:value});
                    if(user){
                        throw new Error('email already exists')
                    }
                }catch(error){
                    throw new Error(error.message)
                }
                return true
            }
        }
    },

    //validation for Password
    password:{
        in:['body'],
        exists:{
            errorMessage:'password field is required'
        },
        notEmpty:{
            errorMessage:'password field should not be empty'
        },
        trim:true,
        isStrongPassword:{
            options:{
                minLengh:8,
                minUpperCase:1,
                minLowerCase:1,
                minSymbol:1,
                minNumber:1
            },
            errorMessage:'password length sould be 8 charecter and password sould contain 1 number, 1 symbol, 1 uppercase, 1 lowercase'
        }

    }
};


////user login validation schema

export const userLoginValidationSchema = {
    //validation for email
    email:{
        in:['body'],
        exists:{
            errorMessage:'email field is required'
        },
        notEmpty:{
            errorMessage:'Email field is should not be empty'
        },
        trim:true,
        normalizeEmail:true,
        isEmail:{
            errorMessage:'Please provide valid email format'
        }
    },

    //validation for password
    password:{
        in:['body'],
        exists:{
            errorMessage:'password field is required'
        },
        notEmpty:{
            errorMessage:'password filed should not be empty'
        },
        trim:true,
        isStrongPassword:{
            options:{
                minLengh:8,
                minUpperCase:1,
                minLowerCase:1,
                minSymbol:1,
                minNumber:1
            },
            errorMessage:'password length sould be 8 charecter and password sould contain 1 number, 1 symbol, 1 uppercase, 1 lowercase'
        }
    }
}