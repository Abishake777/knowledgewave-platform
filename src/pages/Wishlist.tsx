
import { Link } from 'react-router-dom';
import { Bookmark, Trash2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/components/ui/use-toast';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();

  const handleRemoveFromWishlist = (id: string, title: string) => {
    removeFromWishlist(id);
    toast({
      title: "Removed from wishlist",
      description: `${title} has been removed from your wishlist.`,
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">My Wishlist</h1>
              <p className="text-muted-foreground">Courses you're interested in</p>
            </div>
            <Bookmark className="h-6 w-6 text-primary" />
          </div>
          
          {wishlist.length === 0 ? (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-lg font-medium mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-4">Browse our courses and add some to your wishlist</p>
              <Link to="/catalog">
                <Button>Browse Courses</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                    <p className="font-medium mt-2">${course.price.toFixed(2)}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Link to={`/course/${course.id}`}>
                      <Button variant="outline">View Course</Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleRemoveFromWishlist(course.id, course.title)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Wishlist;
