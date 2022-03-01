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
    images: {
        image_1: {
            img_url: {
                type: String,
                default: null
            },
            public_id: {
                type: String,
                default: null
            }
        },
        image_2: {
            img_url: {
                type: String,
                default: null
            },
            public_id: {
                type: String,
                default: null
            }
        },
        image_3: {
            img_url: {
                type: String,
                default: null
            },
            public_id: {
                type: String,
                default: null
            }
        },
        image_4: {
            img_url: {
                type: String,
                default: null
            },
            public_id: {
                type: String,
                default: null
            }
        },
        image_5: {
            img_url: {
                type: String,
                default: null
            },
            public_id: {
                type: String,
                default: null
            }
        },
        image_6: {
            img_url: {
                type: String,
                default: null
            },
            public_id: {
                type: String,
                default: null
            }
        },
        image_7: {
            img_url: {
                type: String,
                default: null
            },
            public_id: {
                type: String,
                default: null
            }
        },
        image_8: {
            img_url: {
                type: String,
                default: null
            },
            public_id: {
                type: String,
                default: null
            }
        },
        image_9: {
            img_url: {
                type: String,
                default: null
            },
            public_id: {
                type: String,
                default: null
            }
        },
        image_10: {
            img_url: {
                type: String,
                default: null
            },
            public_id: {
                type: String,
                default: null
            }
        },
    },
    amount_collected: {
        type: Number,
        default: 0
    },
    user_count: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Post = mongoose.model('posts', postSchema)
module.exports = Post
