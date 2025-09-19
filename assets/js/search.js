;(function () {
    const searchTrigger = document.getElementById("search-trigger");
    const searchModal = document.getElementById("search-modal");
    const searchInput = document.getElementById("search-field");
    const searchResultElement = document.getElementById("search-results");

    const searchIndex = new MiniSearch({
        fields: ['title', 'content'], // fields to index for full-text search
        storeFields: ['title', 'content', 'url', 'ancestors'], // fields to return with search results
        searchOptions: {
            boost: { title: 2 },
            fuzzy: 0.2
        }
    });

    fetch("/search/index.json")
        .then(response => {
            return response.json();
        })
        .then(result => {
            searchIndex.addAll(result);
            searchInput.removeAttribute("disabled");
        });

    searchInput.addEventListener("input", e => {
        const searchString = e.target.value;

        if (!searchString || searchString.length < 3) {
            return;
        }

        const searchResults = searchIndex.search(searchString);

        if (searchResults.length > 0) {
            searchResultElement.innerHTML = searchResults.map(item => {
                return `
                    <div>
                        <nav class="breadcrumb is-small mt-1 mb-0">
                            <ul>
                                ${item.ancestors.reduce((acc, val) => {
                                    return acc + `<li><a>${val.title}</a></li>`
                                }, '')}
                                <li></li>
                            </ul>
                        </nav>
                        <h6 class="mt-1 mb-1"><a href="${item.url}">${item.title}</a></h6>
                        <p>${(item.content.length > 200 ? (item.content.substring(0, 200) + "...") : item.content)}</p>
                    </div>
                `;
            }).join('<hr class="mt-3 mb-3">');
        } else {
            searchResultElement.innerHTML = '<p>No results found</p>';
        }
    });

    searchTrigger.addEventListener("click", e => {
        e.preventDefault();
        openSearch();
    });

    document.addEventListener("keydown", e => {
        switch (e.key) {
        case "/":
            if (!isSearchOpen()) {
                e.preventDefault();
                openSearch();
            }
            break;
        case "Escape":
            if (isSearchOpen()) {
                e.preventDefault();
                closeSearch();
            }
            break;
        }
    });

    document.querySelectorAll('#search-modal .modal-background, #search-modal .modal-close').forEach(target => {
        target.addEventListener('click', e => {
            e.preventDefault();
            closeSearch();
        });
    });

    function openSearch() {
        searchModal.classList.add("is-active");
        searchInput.focus();
    }

    function closeSearch() {
        searchModal.classList.remove("is-active");
    }

    function isSearchOpen() {
        return searchModal.classList.contains("is-active");
    }
})();

