"use client";
import BannerWithImage from "@/app/components/common-components/banner-with-image";
import BlogDetail from "../../components/blog-components/blogDetail";
import { blogData } from "../../data/blogData"; // Import blog data
import { useParams } from 'next/navigation'; // Import useParams
import Image from "next/image"; // Keep if BannerWithImage needs it, or remove if not used here directly
import imagePlaceholder from "../../../../public/images/image_placeholder.svg" // Default placeholder
import Link from "next/link";

const BlogDetailPage = () => {
    const params = useParams();
    const slug = params?.slug;

    const article = blogData.find(blog => blog.slug === slug);

    if (!article) {
        return (
            <div className="pt-[80px] text-center py-20">
                <h1 className="text-2xl">Blog Post Not Found</h1>
                <p>Sorry, we couldn't find the article you were looking for.</p>
                <Link href="/blog" className="text-blue-600 hover:underline">Back to Blog</Link>
            </div>
        );
    }

    return (
        <div className="pt-[80px]">
            {/* Use article image for banner if available, else fallback */}
            {/* Assuming BannerWithImage can take an image src prop */}
            <BannerWithImage image={article.image || imagePlaceholder} altText={article.title || "Blog banner"} />
            <BlogDetail article={article} /> {/* Pass the full article object */}
        </div>
    );
}

export default BlogDetailPage;