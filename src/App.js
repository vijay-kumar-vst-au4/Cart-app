import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import *as firebase from 'firebase';
class App extends React.Component {

  constructor () {
    super();
    this.state = {
      products: [],
      loading:true
    }
    this.db=firebase.firestore();
  }
  componentDidMount()
  {
    // firebase
    //   .firestore()
    //   .collection('products')
    //   .get()
    //   .then((snapshot)=>{
    //     console.log(snapshot);
    //     snapshot.docs.map((doc)=>{
    //       console.log(doc.data())
    //     });
    //     const products=snapshot.docs.map((doc)=>{
    //       const data=doc.data();
    //       data['id']=doc.id;
    //       return data;
    //     })
    //     this.setState({
    //       products,
    //       loading:false
    //     })
    //   })
     this.db
       .collection('products')
       //.where('price','>',1000)
       //.orderBy('price','desc')
       
       .onSnapshot((snapshot)=>{
       console.log(snapshot);
       snapshot.docs.map((doc)=>{
        console.log(doc.data())
        });
        const products=snapshot.docs.map((doc)=>{
          const data=doc.data();
           data['id']=doc.id;
          return data;
        })
        this.setState({
           products,
          loading:false
        })
       })
  }

  
  handleIncreaseQuantity = (product) => {
   
    const { products } = this.state;
    const index = products.indexOf(product);

    //products[index].qty += 1;

    //this.setState({
     // products
    //})
    
    //const docRef=this.db.doc(`products/${products[index].id}`);
    const docRef=this.db.collection('products').doc(products[index].id);
    docRef
    .update({
      qty:products[index].qty+1
    })
    .then(()=>{
      console.log('updated succeccfuly');
    })
    .catch((error)=>{
     console.log('Error',error);
    })

    
  }
  handleDecreaseQuantity = (product) => {
    console.log('Heyy please inc the qty of ', product);
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    //products[index].qty -= 1;

    //this.setState({
    //  products
    //})
    const docRef=this.db.collection('products').doc(products[index].id);
    docRef
    .update({
      qty:products[index].qty-1
    })
    .then(()=>{
      console.log('updated succeccfuly');
    })
    .catch((error)=>{
     console.log('Error',error);
    })

  }
  handleDeleteProduct = (id) => {
    const { products } = this.state;

    //const items = products.filter((item) => item.id !== id); // [{}]

    //this.setState({
      //products: items
    //})
    const docRef=this.db.collection('products').doc(id);
    // docRef.delete().then(()=>{
    //   console.log("Deleteed");
    // }).catch((error)=>{
    //   console.log(error);
    // })
     docRef
     .delete()
     .then(()=>{
       console.log('Deleted succeccfuly');
     })
     .catch((error)=>{
      console.log('Error',error);
     })

  }

  getCartCount = () => {
    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    })

    return count;
  }

  getCartTotal = () => {
    const { products } = this.state;

    let cartTotal = 0;

    products.map((product) => {
      cartTotal = cartTotal + product.qty * product.price
    })

    return cartTotal;
  }
  addProduts=()=>{
   this.db
   .collection('products')
   .add({
     img:'data:image/jpeg;base64,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',
     price:900,
     qty:3,
     title:'Washing Machine '
     })
   .then((docRef)=>{
     console.log('produts has been added',docRef);
   })
   .catch((error)=>{
     console.log('error',error);
   })
  }
  render () {
    const { products,loading} = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <button onClick={this.addProduts} style={{padding:10,fontSize:20,borderBlockEndColor:btoa}}>Add a products</button>
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        {loading && <h1>Loading Products...</h1>}
        <div style={ {padding: 10, fontSize: 20} }>TOTAL: {this.getCartTotal()} </div>
      </div>
    );
  }
}

export default App;
