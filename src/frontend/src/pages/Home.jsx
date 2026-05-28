import ResetButton from "../components/ResetButton";

function Home({backendURL}) {
    return (
        <>
            <h1>Home page</h1>
            <div className="homepageDescription">
                <p>Developer information and Project overview here.</p>
                <ResetButton backendURL={backendURL}></ResetButton>
            </div>
        </>
    )
} export default Home;