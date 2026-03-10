import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';
import { PlusCircle, Edit, Trash2, Zap } from 'lucide-react';

export function BlogList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
    setLoading(false);
  };

  const handleSeedBlogs = async () => {
    if (!window.confirm("This will insert 6 example blog posts into your database. Proceed?")) return;

    setLoading(true);
    const exampleBlogs = [
      {
        title: "The Art of Ceylon Tea: A Morning in the Plantations",
        slug: "art-of-ceylon-tea",
        excerpt: "Discover the intricate process of growing, harvesting, and brewing the world's finest tea right here in the central highlands of Sri Lanka.",
        content: "<p>Sri Lanka's central highlands are world-renowned for their rolling tea estates. Waking up at greenheaven, the first thing you notice is the crisp, misty air—the perfect climate for the famous Ceylon tea.</p><p>Our local tea pluckers begin their day early, expertly selecting only the tender 'two leaves and a bud'. It's a skill passed down through generations. Once picked, the leaves undergo a meticulous process of withering, rolling, oxidation, and firing.</p><p>We invite our guests to join this morning ritual. Walk through the emerald-green fields, learn the art of plucking, and end your morning with a freshly brewed, golden cup of authentic Ceylon tea while overlooking the valley.</p>",
        image_url: "https://images.unsplash.com/photo-1544281679-43c3d526017b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        published: true,
      },
      {
        title: "From Farm to Table: Our Organic Philosophy",
        slug: "farm-to-table-philosophy",
        excerpt: "Learn about our commitment to sustainable agriculture and how we bring fresh, organic produce straight from our fields to your dining table.",
        content: "<p>At greenheaven, food is more than just sustenance; it's a celebration of the earth. We believe in organic, sustainable farming practices that nourish the soil and provide the healthiest ingredients for our guests.</p><p>Our menus change with the seasons, heavily relying on what is ripe and ready in our own vegetable patches. From fiery curries made with our freshly ground spices to crisp morning salads, every bite tells a story of the Welimada soil.</p><p>We use no chemical fertilizers or pesticides. Instead, we rely on traditional Sri Lankan farming wisdom, companion planting, and natural compost to keep our crops thriving.</p>",
        image_url: "https://images.unsplash.com/photo-1595858603511-bbaae085fba3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        published: true,
      },
      {
        title: "Wildlife Tracking in the Welimada Valley",
        slug: "wildlife-tracking-welimada",
        excerpt: "Join our local guides as we explore the rich biodiversity surrounding greenheaven, from endemic birds to elusive leopards in nearby reserves.",
        content: "<p>The highlands of Sri Lanka are a hotspot for biodiversity. Surrounding our farm are patches of dense cloud forest and grasslands that host a stunning array of wildlife.</p><p>For early risers, our bird-watching tours are a must. You can spot the brilliant blue of a Kingfisher, the endemic Sri Lanka Junglefowl, and if you are lucky, majestic Eagles circling the thermals.</p><p>Venture a bit further to nearby national parks, and the stakes get higher: herds of wild elephants crossing the plains, Sambar deer grazing, and the highly sought-after Sri Lankan Leopard stealthily moving through the underbrush.</p>",
        image_url: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        published: true,
      },
      {
        title: "Traditional Sri Lankan Cooking Secrets",
        slug: "traditional-sri-lankan-cooking",
        excerpt: "Step into our mud kitchen and discover the aromatic spices and traditional techniques that make local cuisine so unforgettable.",
        content: "<p>Sri Lankan cuisine is a vibrant tapestry of flavors, colors, and aromas. In our traditional outdoor mud kitchen, we keep the old culinary ways alive.</p><p>The secret lies in the spices—cinnamon, cardamom, cloves, and intensely roasted curry powders—and the masterful use of rich coconut milk. Everything is cooked slowly over a wood-fire hearth, which imparts an unmistakable smoky depth to the dishes.</p><p>During our interactive cooking classes, guests learn how to scrape fresh coconuts, temper spices in hot oil, and balance the complex flavor profiles of a classic Sri Lankan rice and curry feast.</p>",
        image_url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        published: true,
      },
      {
        title: "Mindful Living: Yoga Among the Paddy Fields",
        slug: "mindful-living-yoga",
        excerpt: "Find your center with guided sunrise yoga sessions overlooking the lush, terraced paddy fields of greenheaven.",
        content: "<p>There is a profound peace that comes with waking up to the sound of nature. We encourage our guests to start their day with mindfulness and intention.</p><p>Our open-air yoga pavilion overlooks the terraced paddy fields, offering a serene backdrop for morning practice. As the golden sunrise burns off the valley mist, the gentle flow of asanas helps connect breath with movement.</p><p>Whether you are a seasoned yogi or a complete beginner, practicing in the open air, surrounded by the towering mountains and rustling trees, is a transformative experience for the mind, body, and soul.</p>",
        image_url: "https://images.unsplash.com/photo-1599901860904-17e08c300cb7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        published: true,
      },
      {
        title: "A Guide to Welimada's Best Trails",
        slug: "welimada-trails-guide",
        excerpt: "Whether you prefer a gentle stroll or a challenging hike, discover the most breathtaking trails branching out from our farm stay.",
        content: "<p>For the adventurous spirit, Welimada offers some of the most spectacular hiking terrain in Sri Lanka. The landscape is a mix of steep, pine-covered ridges, cascading waterfalls, and manicured tea gardens.</p><p>A guest favorite is the hike to 'Lovers Leap' waterfall, a moderately challenging trek that rewards you with icy, crystal-clear plunge pools and panoramic views of the valley below.</p><p>For those looking for a lighter walk, taking the farm trails through the local villages offers a wonderful glimpse into the daily life of the highland communities. Be sure to pack a good pair of walking shoes and your camera!</p>",
        image_url: "https://images.unsplash.com/photo-1580130601254-05fa235abeab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        published: true,
      }
    ];

    try {
      for (const blog of exampleBlogs) {
        await supabase.from('blog_posts').insert([blog]);
      }
      await fetchPosts();
    } catch (err: any) {
      alert("Error seeding blogs: " + err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      await supabase.from('blog_posts').delete().eq('id', id);
      fetchPosts();
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-[30px] p-8 md:p-12 shadow-sm border border-black/5">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-3xl text-forest-moss">Blog Posts</h1>
        <div className="flex gap-4">
          <Link
            to="/admin/blog/new"
            className="flex items-center gap-2 bg-sage-green text-forest-moss px-6 py-3 rounded-xl font-mono text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
          >
            <PlusCircle size={18} />
            New Post
          </Link>
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="text-forest-moss/60 font-mono text-sm">No blog posts found. Create one!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-black/10 text-forest-moss font-mono text-xs uppercase tracking-widest">
                <th className="pb-4 font-normal">Title</th>
                <th className="pb-4 font-normal">Status</th>
                <th className="pb-4 font-normal">Date</th>
                <th className="pb-4 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-sage-green/5 transition-colors group">
                  <td className="py-4 pr-4">
                    <p className="font-bold text-forest-moss">{post.title}</p>
                    <p className="text-sm text-forest-moss/60 truncate max-w-xs">{post.slug}</p>
                  </td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest ${post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-forest-moss/60 font-mono">
                    {new Date(post.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link to={`/admin/blog/${post.id}`} className="text-forest-moss hover:text-sage-green transition-colors">
                        <Edit size={18} />
                      </Link>
                      <button onClick={() => handleDelete(post.id, post.title)} className="text-red-400 hover:text-red-600 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
