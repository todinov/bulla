axios.get("/search")
    .then(function (result) {
        var searchContent = result.data;
        var searchIndex = lunr(function () {
            this.ref("id")
            this.field("content");
            this.field("tag");
            this.field("title");
            this.field("url");

            Array.from(result.data).forEach(function (doc) {
                this.add(doc)
            }, this)
        })

        var searchWrapper = document.getElementById("search-wrapper");
        var searchInput = document.getElementById("search-field");
        var searchResultElement = document.getElementById("search-results");

        searchInput.removeAttribute("disabled");

        searchInput.addEventListener("input", function (e) {
            var searchString = e.target.value;

            if (!searchString) {
                searchWrapper.classList.remove("is-active");
                return;
            }

            var searchResults = [];

            if (searchString && searchString.length > 2) {
                try {
                    searchResults = searchIndex.search(searchString);
                } catch (err) {
                    if (err instanceof lunr.QueryParseError) {
                        return;
                    }
                }
            }

            searchWrapper.classList.add("is-active");

            if (searchResults.length > 0) {
                searchResultElement.innerHTML = searchResults.map(function (match) {
                    var item = searchContent.find(function(e) {
                        return e.id == parseInt(match.ref);
                    });

                    return [
                        "<div class='dropdown-item'>",
                        "<h4><a href='" + item.url + "'>" + item.title + "</a></h4>",
                        "<p>" + (item.content.length > 100 ? (item.content.substring(0, 100) + "...") : item.content) + "</p>",
                        "</div>"
                    ].join("");
                }).join("<hr class='navbar-divider'>");
            } else {
                searchResultElement.innerHTML = '<div class="dropdown-item"><p>No results found</p></div>';
            }
        });
    })
    .catch(function (error) {
        console.error(error);
    });
