
export const idValidationSchema = {
    id:{
        in:['params'],
        isMongoId:{
            errorMessage:'id Should be MongoDB Id'
        }
    }
}