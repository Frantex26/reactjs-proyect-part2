import React, { Component } from 'react'

export const DataContext = React.createContext();

export class DataProvider extends Component {

    state = {
        products: [
            {
                "_id": "1",
                "title": "Anakin Skywalker T-shirt",
                "img": "../img/anakin-img.jpg",
                "description": "Anakin Skywalker T-shirt from Star Wars",
                "content": "Anakin Skywalker was a legendary Force-sensitive human male who was a Jedi Knight of the Galactic Republic and the prophesied Chosen One of the Jedi Order, destined to bring balance to the Force.",
                "price": 25,
                "colors": ["red", "black", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "2",
                "title": "Darth Vader Hoddie",
                "src": "../img/darth-img.jpg",
                "description": "Darth Vader Hoddie from Star Wars",
                "content": "Darth Vader was once Anakin Skywalker, he turned to the dark side under the tutelage of Darth Sidious. Darth Vader is a Sith Lord who serves the Galactic Empire.",
                "price": 45,
                "colors": ["red", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "3",
                "title": "Luke Skywalker T-shirt",
                "src": "../img/luke-img.jpg",
                "description": "Luke Skywalker T-shirt from Star Wars",
                "content": "Luke Skywalker, a Force-sensitive human male, was a legendary Jedi Master who fought in the Galactic Civil War during the reign of the Galactic Empire. Along with his companions, Princess Leia Organa and General Han Solo, Skywalker served as a revolutionary on the side of the Alliance to Restore the Republic, an organization committed to the downfall of the Galactic Empire and the restoration of democracy.",
                "price": 25,
                "colors": ["lightblue", "white", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "4",
                "title": "R2-D2 Hoddie",
                "src": "../img/r2d2-img.jpg",
                "description": "R2-D2 Hoddie from Star Wars",
                "content": "R2-D2, pronounced Artoo-Detoo and often referred to as R2 (Artoo), was an R2-series astromech droid. A smart droid who would serve a multitude of masters over his lifetime. His bravery and ingenuity saved the galaxy on numerous occasions. Beginning his service in the employ of Queen Amidala of Naboo, R2-D2 wound up serving Jedi Knight Anakin Skywalker during the waning years of the Galactic Republic, often accompanied by the protocol droid C-3PO in many adventures throughout the Clone Wars. After Skywalker turned to the dark side of the Force, the droid served Senator Bail Organa for a time in the Imperial Senate. Nineteen years following the purge of the Galactic Republic, R2-D2 played a pivotal role in helping the Rebel Alliance destroy the Empire's Death Star superweapon. He carried technical readouts vital to its destruction. Serving Jedi Knight Luke Skywalker, the son of his two former masters throughout the Galactic Civil War.",
                "price": 40,
                "colors": ["orange", "black", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "5",
                "title": "C-3PO Hoddie",
                "src": "../img/c3po-img.jpg",
                "description": "C-3PO Hoddie from Star Wars",
                "content": "C-3PO (See-Threepio) was a 3PO-series protocol droid. Sometimes referred to as Threepio, he was fluent in over six million forms of communication, and developed a fussy and worry-prone personality throughout his many decades of operation. Along with his counterpart, the astromech droid R2-D2, C-3PO constantly found himself directly involved in pivotal moments of galactic history, and aided in saving the galaxy on many occasions.",
                "price": 40,
                "colors": ["orange", "black", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "6",
                "title": "Yoda T-shirt",
                "src": "../img/yoda-img.jpg",
                "description": "Yoda T-shirt from Star Wars",
                "content": "Yoda was a legendary Jedi Master who led the Jedi Order in the years leading up to its destruction by the Sith and the transition of the Galactic Republic into the Galactic Empire. Small in stature but revered for his wisdom and power, Yoda trained generations of Jedi, ultimately serving as the Jedi Order's Grand Master. He played integral roles in defending the Republic during the Clone Wars, passing on the Jedi tradition to Luke Skywalker, and unlocking the path to immortality.",
                "price": 25,
                "colors": ["orange", "black", "crimson", "teal"],
                "count": 1
            }
        ],
cart: [],
    total: 0
        
    };

addCart = (id) => {
    const { products, cart } = this.state;
    const check = cart.every(item => {
        return item._id !== id
    })
    if (check) {
        const data = products.filter(product => {
            return product._id === id
        })
        this.setState({ cart: [...cart, ...data] })
    } else {
        alert("The product has been added to cart.")
    }
};

reduction = id => {
    const { cart } = this.state;
    cart.forEach(item => {
        if (item._id === id) {
            item.count === 1 ? item.count = 1 : item.count -= 1;
        }
    })
    this.setState({ cart: cart });
    this.getTotal();
};

increase = id => {
    const { cart } = this.state;
    cart.forEach(item => {
        if (item._id === id) {
            item.count += 1;
        }
    })
    this.setState({ cart: cart });
    this.getTotal();
};

removeProduct = id => {
    if (window.confirm("Do you want to delete this product?")) {
        const { cart } = this.state;
        cart.forEach((item, index) => {
            if (item._id === id) {
                cart.splice(index, 1)
            }
        })
        this.setState({ cart: cart });
        this.getTotal();
    }

};

getTotal = () => {
    const { cart } = this.state;
    const res = cart.reduce((prev, item) => {
        return prev + (item.price * item.count);
    }, 0)
    this.setState({ total: res })
};

componentDidUpdate(){
    localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
    localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
};

componentDidMount(){
    const dataCart = JSON.parse(localStorage.getItem('dataCart'));
    if (dataCart !== null) {
        this.setState({ cart: dataCart });
    }
    const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
    if (dataTotal !== null) {
        this.setState({ total: dataTotal });
    }
}


render() {
    const { products, cart, total } = this.state;
    const { addCart, reduction, increase, removeProduct, getTotal } = this;
    return (
        <DataContext.Provider
            value={{ products, addCart, cart, reduction, increase, removeProduct, total, getTotal }}>
            {this.props.children}
        </DataContext.Provider>
    )
}
}


