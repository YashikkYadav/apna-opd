import BannerWithImage from "@/app/components/common-components/banner-with-image";
import BlogDetail from "../../components/blog-components/blogDetail";
import image from "../../../../public/images/image_placeholder.svg"


const BlogDetailPage = () => {
    return (
        <div className="pt-[80px]">
            <BannerWithImage image={image}/>
            <BlogDetail />
        </div>
    );
}

export default BlogDetailPage;