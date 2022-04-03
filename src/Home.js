import { Link } from "react-router-dom"

export default function Home() {


    return (
        <div className="container mx-auto pt-20">
            <h1 className="text-4xl text-emas font-bold text-center">Projek CRA Rest API Aqsha</h1>
            <div className="mt-4 flex justify-center items-center">
                <div className="mx-4 ">
                    <Link to="film"><h3 className="px-8 py-4 border-4 border-emas text-2xl rounded-lg hover:bg-emas/50 transition-all">Projek API Film</h3></Link>
                </div>
                <div className="mx-4 ">
                    <Link to="covid"><h3 className="px-8 py-4 border-4 border-green-500 text-2xl rounded-lg hover:bg-green-500/50 transition-all">Projek API Covid</h3></Link>
                </div>
            </div>
        </div>
    )
}