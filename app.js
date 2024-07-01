const { name } = require('ejs');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { type } = require('os');
const path = require('path');
const { features } = require('process');
const bcrypt = require('bcryptjs');

//initialize the app
const app = express();

mongoose.connect( "mongodb+srv://melvin:pantrucks@pantrucks.vsy6tgt.mongodb.net/?retryWrites=true&w=majority&appName=pantrucks", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//set app to listen on port address
app.listen(4000, ( ()=> {
    console.log('listening');
}));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const productSchema = new mongoose.Schema({
    image: {
        data: Buffer,
    },
    name: {
        type: String, 
        required: true
    },
    partNumber: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    productDescription: {
        type: String,
        required: true
    },
    countryOfOrigin: {
        type: String,
        required: true
    },
    productDetails: {
        type: String,
        required: true
    }
}, {timestamps: true} );

const featuredProductsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
},{timestamps: true});

const discountedProductsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    previousPrice: {
        type: Number,
        required: true
    },
    currentPrice: {
        type: Number,
        required: true
    }
},{timestamps: true});

const membersSchema = new mongoose.Schema({
    image: {
        data: Buffer,
    },
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
    
},{timestamps: true});

const reviewsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
    
},{timestamps: true});

const categorySchema = new mongoose.Schema({
    image: {
        data: Buffer,
    },
    name: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    }
});

const servicesSchema = new mongoose.Schema({
    image: {
        data: Buffer,
    },
    image1: {
        data: Buffer,
    },
    name: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    }
},{timestamps: true});

const infoSchema = new mongoose.Schema({
    visits: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    transactions: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    passcode: {
        type: String,
        required: true
    },
},{timestamps: true});

const visitsSchema = new mongoose.Schema({}, { timestamps: true });

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const salesSchema = new mongoose.Schema({
    image: {
        data: Buffer,
    },
    name: {
        type: String, 
        required: true
    },
    partNumber: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    productDescription: {
        type: String,
        required: true
    },
    countryOfOrigin: {
        type: String,
        required: true
    },
    productDetails: {
        type: String,
        required: true
    }
},{timestamps: true});

const messageSchema = new mongoose.Schema({
    firstUserName: {
        type: String,
        required: true
    },
    lastUserName: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
},{timestamps: true});


const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
}, { _id: false });


const cartSchema = new mongoose.Schema({
    items: [itemSchema],
    firstUserName: {
        type: String,
        required: true
    },
    lastUserName: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userId: { type: Number, required: true } 
}, { timestamps: true });





// Models
const Item = mongoose.model('Item', itemSchema);
const Cart = mongoose.model('Cart', cartSchema);
const product = mongoose.model('product', productSchema);
const featuredProducts = mongoose.model('featuredProducts', featuredProductsSchema);
const discountedProducts = mongoose.model('discountedProducts', discountedProductsSchema);
const members = mongoose.model('members', membersSchema);
const reviews = mongoose.model('reviews', reviewsSchema);
const services = mongoose.model('services',servicesSchema);
const category = mongoose.model('category',categorySchema);
const info = mongoose.model('info', infoSchema);
const visit = mongoose.model('visits', visitsSchema);
const User = mongoose.model('User', userSchema);
const sales = mongoose.model('sales', salesSchema);
const cart = mongoose.model('cart', cartSchema);
const message = mongoose.model('message', messageSchema);



//setup ejs templating engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));


//provide access to public folder
app.use(express.static('public'));

app.use(express.json());


app.post('/service', async (req, res) => {
    try {
        const { name } = req.body;
        dataService = req.body;
        res.status(201).json({ sent: `${name}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ sent: 'failed to upload' });
    }
});

app.post('/category', async (req, res) => {
    try {
        const { name } = req.body;
        dataCategory = req.body;
        res.status(201).json({ sent: `${name}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ sent: 'failed to upload' });
    }
});

app.post('/addservice', upload.fields([{ name: 'image' }, { name: 'image1' }]), async (req, res) => {
    try {
        const { buffer: imageBuffer } = req.files['image'][0];
        const { buffer: image1Buffer } = req.files['image1'][0];
        const { name, overview, details } = req.body;

        const Service = new services({
            image: {
                data: imageBuffer,
                contentType: 'image/jpg',
            },
            image1: {
                data: image1Buffer,
                contentType: 'image/jpg',
            },
            name,
            overview,
            details
        });

        await Service.save();
        res.status(201).json({ sent: 'uploaded successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ sent: 'failed to upload'});
    }
});


app.post('/addCategory',upload.single('image'),async (req, res) => {
    try {
        const { buffer } = req.file;
        const {
            name,
            details
        } = req.body;

        const Category = new category({
            image: {
                data: buffer,
                contentType: 'image/jpg',
            },
            name,
            details
        });

        await Category.save();
        res.status(201).json({ sent: 'uploaded successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ sent: 'failed to upload'});
    }
});

app.post('/addPerson',upload.single('image'),async (req, res) => {
    try {
        const { buffer } = req.file; // Extract file-related information
        // Extract other form fields from req.body
        const {
            name,
            phoneNumber,
            email,
            title
        } = req.body;

        const member = new members({
            image: {
                data: buffer,
                contentType: 'image/jpg',
            },
            name,
            phoneNumber,
            email,
            title
        });

        await member.save();
        res.status(201).json({ sent: 'uploaded successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ sent: 'failed to upload'});
    }
});

app.post('/add-featured', async (req, res) => {
    const { name } = req.body;

    try {
        const existingProduct = await product.findOne({ name });

        if (existingProduct) {
            const featuredProduct = new featuredProducts({ name });

            featuredProduct.save()
                .then(result => {
                    res.status(201).json({ sent: 'sent successfully'});
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({ sent: 'failed to send'});
                });
    } else {
        res.status(404).json({ sent: 'product not found'});
    }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

app.post('/add-discounted-product', async (req, res) => {
    const {
        name, 
        previousPrice, 
        currentPrice
    } = req.body;

    try {
        const existingProduct = await product.findOne({name});

        if (existingProduct) {
            const discountedProduct = new discountedProducts({
                name, 
                previousPrice, 
                currentPrice 
            });

            discountedProduct.save()
                .then(result => {
                    res.status(201).json({ sent: 'sent successfully'});
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({ sent: 'failed to send'});
                });
    } else {
        res.status(404).json({ sent: 'product not found'});
    }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

app.post('/upload-product', upload.single('image'), async (req, res) => {
    try {
        const { originalname, buffer } = req.file; // Extract file-related information
        // Extract other form fields from req.body
        const {
            name,
            partNumber,
            manufacturer,
            price,
            brand,
            category,
            productDescription,
            countryOfOrigin,
            productDetails,
        } = req.body;

        const Product = new product({
            image: {
                data: buffer,
                contentType: 'image/jpg',
            },
            name,
            partNumber,
            manufacturer,
            price,
            brand,
            category,
            productDescription,
            countryOfOrigin,
            productDetails,
        });

        await Product.save();
        res.status(201).json({ sent: 'uploaded successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ sent: 'failed to upload'});
    }
});

app.post('/addMessage', async (req,res) => {
    const {
        firstUserName, 
        lastUserName, 
        mobileNumber,
        email,
        subject,
        text
    } = req.body;
    try {
        const Message = new message({
            firstUserName, 
            lastUserName, 
            mobileNumber,
            email,
            subject,
            text
        });

        Message.save()
            .then(result => {
                res.status(201).send('<h3>Message sent successfully, Please return to precious page<h3/>');
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ sent: 'failed to send'});
            });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});


app.post('/addCartRequest', async (req, res) => {
    // Log the request body for debugging
    function getRandomNumber() {
        return Math.floor(Math.random() * 10000001);
    }
 
    const {
        firstUserName,
        lastUserName,
        mobileNumber,
        email,
        names,
        userId = getRandomNumber() // Ensure userId is sent from client or generated on server
    } = req.body;

    if (!firstUserName || !lastUserName || !mobileNumber || !email || !Array.isArray(names) || !userId) {
        return res.status(400).send('All fields are required and names must be an array');
    }

    try {
        // Create Item documents
        const items = await Item.insertMany(names.map(name => ({ name })));

        // Create Cart document
        const cart = new Cart({
            items: items, // Store item IDs in the cart
            firstUserName,
            lastUserName,
            mobileNumber,
            email,
            userId // Include userId
        });
        console.log(cart); 
        await cart.save();
        res.status(201).send('<h3>Message sent successfully, please return to previous page</h3>');
    } catch (err) {
        console.error('Error saving cart:', err);
        res.status(500).send('Internal server error');
    }
});

const hashPassword = async (plainTextPassword) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
    return hashedPassword;
};

app.post('/login', async (req, res) => {
    const { username, email, password } = req.body;
console.log(username, email, password);
try {
    const hashedPassword = await hashPassword(password);
    //const user = new User({
        //username,
        //email,
       // password: hashedPassword
    //});
    //await user.save(); 
    //res.status(201).send('User created successfully');
    } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
    }


    try {
        const trimmedUsername = username.trim();
        const foundUser = await User.findOne({ username: trimmedUsername });
        
        
        
        if (!foundUser) {
            return res.status(400).send('User not found');
        }

        // Check the password
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }

        // Successful login
       
        let Category, Products, featuredproducts, discountedproducts, Reviews, Info, Sales, Members, visits, service,messages,carts;
        let visitsTodayCount, visitsLast7DaysCount, visitsLastMonthCount;
        
        try {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        messages = await message.find({
            createdAt: { $gte: oneWeekAgo }
        });

        if (!messages || messages.length === 0) {
            return res.status(404).send('Messages not found from the last week');
        }

        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }


    try {
        service = await services.find();
        if (!service) {
            return res.status(404).send('Service not found');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }

    try {
        carts = await cart.find();
        if (!carts) {
            return res.status(404).send('Service not found');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }

    try {
        Category = await category.find();
        if (!Category) {
            return res.status(404).send('Category not found');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }

    try {
        Members = await members.find();
        if (!Members) {
            return res.status(404).send('Members not found');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }

    try {
        Products = await product.find();
        if (!Products) {
            return res.status(404).send('Products not found');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }

    try {
        featuredproducts = await featuredProducts.find();
        if (!featuredproducts) {
            return res.status(404).send('Featured products not found');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }

    try {
        discountedproducts = await discountedProducts.find();
        if (!discountedproducts) {
            return res.status(404).send('Discounted products not found');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }

    try {
        Reviews = await reviews.find();
        if (!Reviews) {
            return res.status(404).send('Reviews not found');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }

    try {
        Info = await info.find();
        if (!Info) {
            return res.status(404).send('Info not found');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }

    try {
        Sales = await sales.find();
        if (!Sales) {
            return res.status(404).send('Sales not found');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }

    try {
        const visitCounts = await getVisitCounts();
        visitsTodayCount = visitCounts.visitsTodayCount;
        visitsLast7DaysCount = visitCounts.visitsLast7DaysCount;
        visitsLastMonthCount = visitCounts.visitsLastMonthCount;
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
    res.render('admin', {
        featuredproducts,
        discountedproducts,
        Reviews,
        Products,
        Info,
        Sales,
        carts,
        Members,
        messages,
        Services: service,
        visits,
        Category,
        visitsTodayCount, 
        visitsLast7DaysCount, 
        cartProducts,
        visitsLastMonthCount
    });
} catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

var cartItemsArray = [];
var cartProducts = [];
app.post('/cart', async (req, res) => {
    try {
        cartItemsArray = req.body;  
        
        if (!cartItemsArray || cartItemsArray.length === 0) {
            return res.status(400).send('No cart items specified.');
        }

        cartProducts = await product.find({ name: { $in: cartItemsArray } });
 
        res.json(cartProducts.length);
    } catch (error) {
        console.error('Error fetching cart products:', error);
        res.status(500).send('Internal Server Error');
    }
});





app.delete('/deletemember/:id', (req, res) => {
    const id = req.params.id;

    members.findByIdAndDelete(id)
        .then(result => {
            res.json({ delete: 'deleted successfully'});
        })
        .catch(err => console.log(err));
});

app.delete('/deletefeature/:id', (req, res) => {
    const id = req.params.id;

    featuredProducts.findByIdAndDelete(id)
        .then(result => {
            res.json({ delete: 'deleted successfully'});
        })
        .catch(err => console.log(err));
});

app.delete('/deletediscounted/:id', (req, res) => {
    const id = req.params.id;

    discountedProducts.findByIdAndDelete(id)
        .then(result => {
            res.json({ delete: 'deleted successfully'});
        })
        .catch(err => console.log(err));
});

app.delete('/deleteproduct/:id', (req, res) => {
    const id = req.params.id;

    product.findByIdAndDelete(id)
        .then(result => {
            res.json({ delete: 'deleted successfully'});
        })
        .catch(err => console.log(err));
});

app.delete('/deletereviews/:id', (req, res) => {
    const id = req.params.id;

    reviews.findByIdAndDelete(id)
        .then(result => {
            res.json({ delete: 'deleted successfully'});
        })
        .catch(err => console.log(err));
});



async function getVisitCounts() {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOf7DaysAgo = new Date(startOfToday - 6 * 24 * 60 * 60 * 1000); // 7 days ago including today

    // Get the start of the previous month
    let startOfMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    if (now.getMonth() === 0) { // If current month is January, adjust to December of previous year
        startOfMonth = new Date(now.getFullYear() - 1, 11, 1);
    }

    const visitsTodayCount = await visit.countDocuments({ createdAt: { $gte: startOfToday } });
    const visitsLast7DaysCount = await visit.countDocuments({ createdAt: { $gte: startOf7DaysAgo } });
    const visitsLastMonthCount = await visit.countDocuments({ createdAt: { $gte: startOfMonth } });

    return { visitsTodayCount, visitsLast7DaysCount, visitsLastMonthCount };
}


app.get('/', async (req, res) => {
    
    let Category, Products, featuredproducts, discountedproducts, Reviews, visits;


    try {

        visits = new visit();

        await visits.save();
        res.status(201);
    } catch (error) {
        console.error(error);
        res.status(500).json({ sent: 'failed to upload'});
    }



    try {
        Category = await category.find(Category);

        if (!Category) {
            return res.status(404).send('new arrival not found');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

    try {
        Products = await product.find(Products);

        if (!Products) {
            return res.status(404).send('new arrival not found');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

    try {
        featuredproducts = await featuredProducts.find(featuredproducts);

        if (!featuredproducts) {
            return res.status(404).send('new arrival not found');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

    try {
        discountedproducts = await discountedProducts.find(discountedproducts);

        if (!discountedproducts) {
            return res.status(404).send('new arrival not found');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

    try {
        Reviews = await reviews.find(Reviews);

        if (!Reviews) {
            return res.status(404).send('new arrival not found');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    let service;
    try {
        service = await services.find();

        if (!service ) {
            return res.status(404).send('new arrival not found');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    res.render('home', {
        cartProducts,
        featuredproducts,
        discountedproducts,
        Reviews,
        Products,
        Category,
        Services:service,
    });
});

app.get('/about-us', async (req, res) => {
    
    let Category,Members,service,Products;
    
    try {
        Products = await product.find(Products);

        if (!Products) {
            return res.status(404).send('new arrival not found');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    try {
        service = await services.find();

        if (!service ) {
            return res.status(404).send('new arrival not found');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    try {
        Category = await category.find(Category);

        if (!Category) {
            return res.status(404).send('new arrival not found');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

    try {
        Members = await members.find(Members);

        if (!Members) {
            return res.status(404).send('new arrival not found');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

    res.render('about-us', {
        cartProducts,
        Members,
        Category,
        Services:service,Products
    });
});

app.get('/categories', async (req, res) => {
    let Category,Products,service;
    const selectedCategoryTag = req.query.selectedCategoryTag;
    const categor = await category.findOne({name:selectedCategoryTag});
    try {
        service = await services.find();

        if (!service ) {
            return res.status(404).send('new arrival not found');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
     try {
        Category = await category.find(Category);

        if (!Category) {
            return res.status(404).send('new arrival not found');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    try {
        Products = await product.find(Products);

        if (!Products) {
            return res.status(404).send('new arrival not found');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

    res.render('categories', {
        cartProducts,
        Products,
        Category,
        Services:service,
        categor
    });
});

app.get('/services', async (req, res) => {
    let Category, service,Products;
    const selectedTag = req.query.selectedTag;
    const serve = await services.findOne({name:selectedTag }); 
    try {
        Products = await product.find(Products);

        if (!Products) {
            return res.status(404).send('new arrival not found');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
     try {
        Category = await category.find();

        if (!Category) {
            return res.status(404).send('new arrival not found');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    try {
        service = await services.find();

        if (!service ) {
            return res.status(404).send('new arrival not found');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    
    res.render('services',{
        cartProducts,
        Services:service,
        Products,
        Category,
        serve
    });
});

app.get('/shop', async (req, res) => {
    let Category, Products, service;
    try {
        service = await services.find();

        if (!service ) {
            return res.status(404).send('new arrival not found');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    try {
        Category = await category.find();

        if (!Category) {
            return res.status(404).send('new arrival not found');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    try {
        Products = await product.find();

        if (!Products) {
            return res.status(404).send('new arrival not found');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    const page = parseInt(req.query.page) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    let products, totalProducts;
    try {
        products = await product.find().skip(skip).limit(limit);
        totalProducts = await product.countDocuments();
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).send('Internal Server Error');
    }
    res.render('shop', {
        cartProducts,
        Products,
        products,
        Services:service,
        Category,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
    });
});

app.get('/contact-us', async (req, res) => {
    let Category,service,Products;
    try {
        service = await services.find();

        if (!service ) {
            return res.status(404).send('new arrival not found');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    try {
        Category = await category.find(Category);

        if (!Category) {
            return res.status(404).send('new arrival not found');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    try {
        Products = await product.find(Products);

        if (!Products) {
            return res.status(404).send('new arrival not found');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    res.render('contact-us',{
        cartProducts,
        Services:service,
        Category,
        Products
    });
});

app.get('/cart', async (req, res) => {
    let Category,Cart,service,Products;
    try {
        service = await services.find();

        if (!service ) {
            return res.status(404).send('new arrival not found');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    try {
        Category = await category.find(Category);

        if (!Category) {
            return res.status(404).send('new arrival not found');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    try {
        Cart = await cart.find(Cart);

        if (!Cart) {
            return res.status(404).send('new arrival not found');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    try {
        Products = await product.find(Products);

        if (!Products) {
            return res.status(404).send('new arrival not found');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    cartProducts.forEach(n => {
        console.log(n.name);
    })
    res.render('cart', {
        cartProducts,
        Cart,
        Services:service,
        Products,
        Category,
        cartProducts
    }
    );
});

app.get('/admin-login', async (req, res) => {
    let visitsTodayCount, visitsLast7DaysCount, visitsLastMonthCount, Category,Products,service;
    try {
        service = await services.find();
        if (!service) {
            return res.status(404).send('Service not found');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }

    try {
        Category = await category.find();
        if (!Category) {
            return res.status(404).send('Category not found');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
    try {
        Products = await product.find();
        if (!Products) {
            return res.status(404).send('Products not found');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
   
    res.render('admin-login', {
        cartProducts,
        Products,
        Services: service,
        Category,
        visitsTodayCount, 
        visitsLast7DaysCount, 
        visitsLastMonthCount
    });
});

app.get('/admin', async (req, res) => {
    res.send('Go to admin login')
});





app.use(async (req, res, next) => {
    let service,Category,Products
    try {
        service = await services.find();
        if (!service) {
            return res.status(404).send('Service not found');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }

    try {
        Category = await category.find();
        if (!Category) {
            return res.status(404).send('Category not found');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
    try {
        Products = await product.find();
        if (!Products) {
            return res.status(404).send('Products not found');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
    res.render('error-404',{
        cartProducts,
        Products,
        Services: service,
        Category
    });
});


