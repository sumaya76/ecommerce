import { motion } from "framer-motion";
import { Target, Heart, Zap, Users } from "lucide-react";
import Breadcrumbs from "@/components/products/Breadcrumbs";

const team = [
  { name: "Alex Rivera", role: "Founder & CEO", image: "https://i.pravatar.cc/200?img=12" },
  { name: "Sarah Chen", role: "Creative Director", image: "https://i.pravatar.cc/200?img=5" },
  { name: "Marcus Johnson", role: "Head of Product", image: "https://i.pravatar.cc/200?img=8" },
  { name: "Emma Williams", role: "Lead Designer", image: "https://i.pravatar.cc/200?img=9" },
];

const values = [
  { icon: Target, title: "Quality First", desc: "Every product is carefully selected and tested to meet our premium standards." },
  { icon: Heart, title: "Customer Love", desc: "Your satisfaction is our top priority. We go above and beyond for you." },
  { icon: Zap, title: "Innovation", desc: "We constantly evolve to bring you the latest and best products." },
  { icon: Users, title: "Community", desc: "We build lasting relationships with our customers and partners." },
];

const About = () => (
  <div className="pt-20 md:pt-24 pb-16">
    <div className="container-custom">
      <Breadcrumbs items={[{ label: "About" }]} />

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto py-16">
        <h1 className="font-display text-4xl md:text-6xl font-bold">Our <span className="text-gradient">Story</span></h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          Founded in 2020, LUXE started with a simple mission: to curate the finest products for modern living. We believe that everyone deserves access to beautifully designed, high-quality goods that make everyday life extraordinary.
        </p>
      </motion.div>

      {/* Mission */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-16">
        <div className="aspect-[4/3] rounded-2xl overflow-hidden">
          <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&auto=format" alt="Our store" className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="section-title mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We're on a mission to transform the way people shop online. By combining expert curation, transparent pricing, and exceptional customer service, we create a shopping experience that's as enjoyable as it is rewarding.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Every product in our collection has been handpicked by our team of experts who share a passion for quality, design, and innovation.
          </p>
        </div>
      </motion.div>

      {/* Values */}
      <section className="py-16">
        <h2 className="section-title text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, i) => (
            <motion.div key={val.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 rounded-xl border border-border bg-card text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
                <val.icon size={24} className="text-accent" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{val.title}</h3>
              <p className="text-sm text-muted-foreground">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <h2 className="section-title text-center mb-12">Meet the Team</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="aspect-square rounded-xl overflow-hidden mb-4">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  </div>
);

export default About;
