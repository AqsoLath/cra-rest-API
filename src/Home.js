import { Link } from "react-router-dom"

export default function Home() {


    return (
        <div className="container mx-auto pt-10">
            <h1 className="text-4xl text-emas font-bold text-center">Projek CRA Rest API Aqsha</h1>
            <div className="flex justify-center items-center">
                <div className="mx-4 ">
                    <Link to="film"><h3 className="mx-4 ">API Film</h3></Link>
                </div>
                <div className="mx-4 ">
                    <Link to="covid"><h3 className="mx-4 ">API Covid</h3></Link>
                </div>
            </div>
        </div>
    )
}