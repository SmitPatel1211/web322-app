const Sequelize = require('sequelize');

var sequelize = new Sequelize('umefhbtv', 'umefhbtv', 'dadAeBmqcDvIhXgGvMbEbbMq-KiiBW2X', {
    host: 'mouse.db.elephantsql.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: { rejectUnauthorized: false }
    },
    query: { raw: true }
});

sequelize
    .authenticate()
    .then(function () {
        console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });



    var Post = sequelize.define('Post', {

        body: Sequelize.TEXT,

        title: Sequelize.STRING,

        postDate: Sequelize.DATE,

        featureImage: Sequelize.STRING,

        published: Sequelize.BOOLEAN

    });
    
    var Category = sequelize.define('Category', {

        category: Sequelize.STRING

    });

    
    Post.belongsTo(Category, { foreignKey: 'category' });

    
    module.exports.initialize = () => {

        return new Promise((resolve, reject) => {

            sequelize.sync()
            
                .then(resolve('SUCCESSFULLY SYNC DATABASE'))
                .catch(reject('unable to sync database'));
        })
    };

    module.exports.addPost = (postData) => {
        return new Promise((resolve, reject) => {
            
            for (var s in postData) {
                if (postData[s] == "") {
                    postData[s] = null;
                }            
            }
            postData.published = (postData.published) ? true : false;

            postData.postDate=new Date();
    
            Post.create(postData)
                .then(resolve(Post.findAll()))
                .catch(reject("Unable to create Post"));

        })
    };
    
    module.exports.getAllPosts = () => {
        return new Promise((resolve, reject) => {
            sequelize.sync()
                .then(resolve(Post.findAll()))
                .catch(reject("NO RESULTS RETURNED"));
        })
    };
    
    
    module.exports.getPublishedPosts = () => {
        return new Promise((resolve, reject) => {
            Post.findAll({
                where: {
                    published: true
                }
            })
                .then(resolve(Post.findAll({ where: { published: true } })))
                .catch(reject("NO RESULTS RETURNED"));
        })
    };
    
    module.exports.getCategories = () => {
        return new Promise((resolve, reject) => {
            Category.findAll()
                .then(data => { resolve(data); })
                .catch(err => { reject("NO RESULTS RETURNED"); })
        })
    };
    
   
    
    module.exports.getPostsByCategory = (CatPostId) => {

        return new Promise((resolve, reject) => {

            Post.findAll({

                where: {
                    
                    category: CatPostId
                }
            })
            .then(resolve(Post.findAll({ where: { category: CatPostId } })))
            .catch(reject("NO RESULTS RETURNED"));
        })
    };


    module.exports.getPostById = (id) => {
        return new Promise((resolve, reject) => {
            Post.findAll({
                where: {
                    id: id
                }
            })
                .then(data => resolve(data[0]))
                .catch(reject("NO RESULTS RETURNED"));
        })
    };

    
    module.exports.getPostsByMinDate = (minDateStr) => {
        return new Promise((resolve, reject) => {
            reject();
        });
    
    }
    
    
    
    module.exports.getPublishedPostsByCategory = (category) => {
        return new Promise((resolve, reject) => {
            Post.findAll({
                where: {
                    published: true,
                    category: category
                }
            })
                .then(resolve(Post.findAll({ where: { published: true, category: category } })))
                .catch(reject("NO RESULTS RETURNED"));
        })
    };

    module.exports.getPostsByMinDate = () => {
        return new Promise((resolve, reject) => {
            const { abc } = Sequelize.Op;
            Post.findAll({
                where: {
                    postDate: {
                        [abc]: new Date(minDateStr)
                    }
                }
            })
                .then(data => resolve(data))
                .catch(reject("NO RESULTS RETURNED"))
    
        })
    }
    
    module.exports.addCategory = (categoryData) => {
        return new Promise((resolve, reject) => {
            for (var s in categoryData) {
                if (categoryData[s] == "") {
                    categoryData[s] = null;
                }
            }
    
            Category.create(categoryData)
                .then(resolve(Category.findAll()))
                .catch(reject("unable to create category"))
        })
    };
    
    module.exports.deleteCategoryById = id => {
        return new Promise((resolve, reject) => {
            Category.destroy({
                where: {
                    id: id
                }
            })
                .then(resolve())
                .catch(reject("unable to delete category"))
        })
    };
    
    module.exports.deletePostById = id => {
        return new Promise((resolve, reject) => {
            Post.destroy({
                where: {
                    id: id
                }
            })
                .then(resolve())
                .catch(reject("Unable to delete Post"))
        })
    };
    
    
    
    
    