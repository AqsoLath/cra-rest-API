import { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {

    const navLinks = useRef();

    const location = useLocation();

    useEffect(function () {
        navLinks.current.classList.add('hidden')
    }, [location]);

    function navbarOn() {
        navLinks.current.classList.toggle('hidden')
    }

    document.addEventListener('click', function (event) {
        const navBar = document.querySelector('#navbar');

        let isClickInside = navBar.contains(event.target);

        if (!isClickInside) {
            navLinks.current.classList.add('hidden');
            // navCover.classList.add('hidden');
        }
    });

    return (
        <div class="nav bg-warna1  text-emas  py-1 fixed top-0 right-0 left-0 z-30 transition-all duration-500" id="navbar" >
            <div class="container mx-auto flex justify-between items-center flex-col lg:flex-row">
                <div class="flex justify-between p-2 items-center w-full">
                    <h4 class="text-2xl text-inherit font-serif font-semibold tracking-wide">AqsoLath</h4>
                    <div>
                        <button class="block lg:hidden" id="hamburger" onClick={navbarOn}>
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                    </div>
                </div>

                <div class="w-full hidden lg:block" id="nav-links" ref={navLinks}>
                    <div class="flex flex-col lg:flex-row py-2 border-t-2 border-t-ungu4 lg:border-t-0">
                        <Link to="/"
                            class="mx-3 text-inherit hover:text-slate-500 transition font-semibold py-1">Home</Link>
                        <Link to="/film"
                            class="mx-3 text-inherit hover:text-slate-500 transition font-semibold py-1">Film</Link>
                        <Link to="/covid"
                            class="mx-3 text-inherit hover:text-slate-500 transition font-semibold py-1">Covid</Link>

                    </div>
                </div>
            </div>
        </div>
    )
}