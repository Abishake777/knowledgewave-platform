
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Trash2, BookOpen, ChevronRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const { toast } = useToast();

  const handleRemoveItem = (id: string, title: string) => {
    removeFromCart(id);
    toast({
      description: `"${title}" has been removed from your cart.`,
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <h1 className="text-2xl font-bold">Your Cart</h1>
            <span className="ml-2 text-muted-foreground">
              ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
            </span>
          </div>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Looks like you haven't added any courses to your cart yet.</p>
              <Link to="/catalog">
                <Button>Browse Courses</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow">
                  <ul className="divide-y">
                    {cartItems.map((item) => (
                      <li key={item.id} className="p-4 flex flex-col sm:flex-row">
                        <div className="sm:w-32 h-20 rounded-md overflow-hidden flex-shrink-0 mb-4 sm:mb-0">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow sm:ml-4">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div>
                              <h3 className="font-medium">{item.title}</h3>
                              <p className="text-sm text-muted-foreground">By {item.instructor}</p>
                              <div className="flex items-center text-sm mt-1">
                                <span className="text-primary">${item.price.toFixed(2)}</span>
                                <span className="text-muted-foreground line-through ml-2">${(item.price * 1.7).toFixed(2)}</span>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="mt-2 sm:mt-0 w-full sm:w-auto justify-center" 
                              onClick={() => handleRemoveItem(item.id, item.title)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <Button variant="outline" onClick={() => clearCart()}>Clear Cart</Button>
                  <Link to="/catalog">
                    <Button variant="ghost">Continue Shopping</Button>
                  </Link>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Original Price:</span>
                      <span>${(calculateTotal() * 1.7).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Discount:</span>
                      <span>-${(calculateTotal() * 0.7).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between font-semibold mb-6">
                    <span>Total:</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  
                  <Link to="/checkout">
                    <Button className="w-full">
                      Proceed to Checkout
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
