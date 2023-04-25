import React from "react";

export default function Search({ search, type }) {

    return (
        <>
            <form role="search">
                <input
                    style={{ width: "35vw" }}
                    className="mx-auto  p-2 form-control rounded-pill"
                    type="search"
                    placeholder={`Search About ${type} Availble Now`}
                    aria-label="Search"
                    onChange={(e) => search(e)}
                />
            </form>
        </>
    );
}
