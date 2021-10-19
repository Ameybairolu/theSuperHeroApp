const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

/* 
NOTE: when we want to fetch data, we use fetch function which requires a URL. I hence created this dedicated function which fetches data
and waits till 5 seconds to fetch it. Otherwise, this simple throws an error.
This AJAX function is employed in model's loadSearchResults function
 */

export const AJAX = async function (url, uploadData = undefined) {
    try {
        const fetchPro = uploadData ? fetch(url) : fetch(url);

        const res = await Promise.race([fetchPro, timeout(5)]);//Change
        const data = await res.json();

        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data;
    } catch (err) {
        throw err;
    }
}