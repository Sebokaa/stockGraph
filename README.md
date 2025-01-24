1. Some technical decisions or tradeoffs you made.
   - I found the requirement to use highcharts to build this application a neccessity because of the time constraint and the complications of building a chart logic. I didn't put any time into focusing on the responsivness of the website, but rather the functionality and overall it has become a fluid application. I opted for a button that fetches the graph after dropdown has been selected instead of using a useEffect that would atomatically reload when the value of the dropdown has changed. UI wasn't a huge focus as well, as I made the functionality of the page a priority. 

3. What challenges did you run into?
   - I could not figure out how to make the drag functionality work to calculate the delta. The documentation I read were not helping me move forward as well, and with the two day contraint I gave myself I could not find a solution. Understanding the api and the documentation in itself also felt like a hastle as I often found myself using AI to figure out the correct api calls to make to get the outputs I needed. 

5. What could you have done better with more time?
   - One thing I wish I could have done better is optimize my code. As of now there is no error handling, and so if the api was to return back nothing when selecting a dropdown at some point my application would crash as I haven't set up an alternative route. 


URL: https://stockdrag.netlify.app/ 
