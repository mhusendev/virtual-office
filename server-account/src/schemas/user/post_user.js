let data = {
    type: 'object',
    description: 'Models For (POST)',
    properties: {
        birth: {
            type: 'object',
            properties: {
                day: {
                    type: 'string'
                },
                month: {
                    type: 'string'
                },
                year: {
                    type: 'string'
                }
            }
        },
        gender: {
            type: 'string'
        },
        username:{
            type: 'string'
        },
        email: {
            type: 'string'
        },
        password: {
            type: 'string'
        },
        firstName: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        },
        phone: {
            type: 'string'
        },
        job_title: {
            type:'string'
        },
        current_position: {
            type:'string'
        }
    },
    required:["gender","birth","job_title"],
}
module.exports = data