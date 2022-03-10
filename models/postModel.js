const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    am_name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    target: {
        type: String,
        default: null
    },
    contact_number: {
        type: String,
        required: true,
    },
    amount_collected: {
        type: String,
        default: 0
    },
    user_count: {
        type: String,
        default: 0
    },
    images: {
        image_1: {
            url: {
                type: String,
                default: null
            },
            public_id: {
                type: String,
                default: null
            }
        },
        image_2: {
            url: {
                type: String,
                default: null
            },
            public_id: {
                type: String,
                default: null
            }
        },
        image_3: {
            url: {
                type: String,
                default: null
            },
            public_id: {
                type: String,
                default: null
            }
        },
        image_4: {
            url: {
                type: String,
                default: null
            },
            public_id: {
                type: String,
                default: null
            }
        },
        image_5: {
            url: {
                type: String,
                default: null
            },
            public_id: {
                type: String,
                default: null
            }
        },
        image_6: {
            url: {
                type: String,
                default: null
            },
            public_id: {
                type: String,
                default: null
            }
        },
        image_7: {
            url: {
                type: String,
                default: null
            },
            public_id: {
                type: String,
                default: null
            }
        },
        image_8: {
            url: {
                type: String,
                default: null
            },
            public_id: {
                type: String,
                default: null
            }
        },
        image_9: {
            url: {
                type: String,
                default: null
            },
            public_id: {
                type: String,
                default: null
            }
        },
        image_10: {
            url: {
                type: String,
                default: null
            },
            public_id: {
                type: String,
                default: null
            }
        },
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Post = mongoose.model('posts', postSchema)
module.exports = Post
