import Footer from "../components/Footer/Footer";
import HeroSection from "./HeroSection";
import PluginsContainer from "./PluginsContainer";

const pluginItem = {
    title: "Plugin Title",
    description: "This is a brief description of the plugin.",
    image: "https://via.placeholder.com/150",
}

const pluginsData = Array(10).fill(pluginItem);

export default function Plugins() {

    return (
        <>
        <HeroSection></HeroSection>
        <PluginsContainer data={pluginsData}></PluginsContainer>
        <Footer></Footer>
        </>
    );

}