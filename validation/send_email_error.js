const JOI = require('joi')

module.exports.sendemailError = (data) => {

    const schema = JOI.object({
        email: JOI.string().min(20).required(),
        name: JOI.string().min(3).required()
    })

    //return sigle error
    return schema.validate(data);

    //return multiple error
    // const { error, value } = schema.validate(data, { abortEarly: false }); // Validate with abortEarly set to false

    // if (error) {
    //     const errors = error.details.map(err => err.message); // Map error messages
    //     return errors; // Return array of error messages
    // }

    // return null;
}