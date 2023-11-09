// Replace this URL with your GraphQL server endpoint
const GRAPHQL_API_URL = 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clmq00hlo0nrh01t9hnpt5ozw/master';

// Replace this with your GraphQL query
const GRAPHQL_QUERY = `
query content($id: ID!, $id2: ID!, $id_footer: ID!) {
  values: page(where: {id: $id}, stage: PUBLISHED) {
    blocks(first: 500) {
      ... on Hero {
        buttons {
          href
          label
        }
        image {
          url
        }
      }
      ... on Column {
        Column_sectionTitle: sectionTitle
        content {
          ... on ColumnComp {
            title
            content
          }
        }
      }
    }
    title
    subtitle
  }
  logoCarousel(where: {id: $id2}) {
    imageUrl
    text
  }
  footer(where: {id: $id_footer}) {
    primaryLinks {
      footerPrimary {
        primaryLinks {
          title
        }
      }
    }
  }
}
`;

// Function to fetch data from the GraphQL API
async function fetchData() {
  try {
    const response = await fetch(GRAPHQL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // You may need to add authentication headers if required
      },
      body: JSON.stringify({
        query: GRAPHQL_QUERY,
        variables: {
                    id: 'clmq1lfbxe82y0aupvn1v67g0', 
                    id2: 'clmq3y4gjfufq0aupq2uwddyx', 
                    id_footer: 'clmq2kge5ev3a0aup6lpar8hb', 
                    id_nav: 'clmq1jrrxe72z0aupxuz6gs89', 
                  },
      }),
    });

    const data = await response.json();
    return data; // Return the data for further processing
  } catch (error) {
    throw error; // Throw an error for handling in the calling code
  }
}

// Call the fetchData function to load data when the page loads
window.addEventListener('load', async () => {
  try {
    const data = await fetchData();
    
    // Access and process the data here
    console.log('data:', data);
    console.log('data values:', data.data.values)

    console.log('block column title:', data.data.values.blocks[0].Column_sectionTitle)
    console.log('column title:', data.data.values.blocks[0].content[0].title)
    console.log('column content:', data.data.values.blocks[0].content[0].content)

    console.log('logo data:', data.data.logoCarousel)
    // console.log('logo data:', data.data.values.blocks[1].buttons[0].label)

    // Access specific fields and update the HTML content as needed
    const title = data.data.values.title;
    const subtitle = data.data.values.subtitle;
    const columnSecTitle = data.data.values.blocks[0].Column_sectionTitle;

    const carouselLogoContainer = document.querySelector('.carousel-logo__container');
    const logos = data.data.logoCarousel;

    

    const carouselLogo = document.querySelector('.carousel-logo');
    const logo = data.data.logoCarousel;
    const wagon = document.createElement('div');
    wagon.classList.add('carousel-logo__container');

    // (FIX)
    wagon.innerHTML = ` 
      <div class='logo-container'>
        <img src=${logo.imageUrl} />
        <p>${logo.text}</p>

      </div>
      <div class='logo-container'>
        <img src=${logo.imageUrl} />
        <p>${logo.text}</p>

      </div>
      <div class='logo-container'>
        <img src=${logo.imageUrl} />
        <p>${logo.text}</p>

      </div>
      <div class='logo-container'>
        <img src=${logo.imageUrl} />
        <p>${logo.text}</p>

      </div>
      <div class='logo-container'>
        <img src=${logo.imageUrl} />
        <p>${logo.text}</p>

      </div>
      <div class='logo-container'>
        <img src=${logo.imageUrl} />
        <p>${logo.text}</p>

      </div>
      
    `;

    carouselLogo.appendChild(wagon);
    
    
    // Access the container element where you want to populate the columns
    const servicesContainer = document.querySelector('.our-services__container');
    // Access the content from your GraphQL response
    const contentArray = data.data.values.blocks[0].content;
    // Loop through the contentArray and create columns
    contentArray.forEach((item) => {
      // Create a new column element
      const column = document.createElement('div');
      column.classList.add('column');

      // Set the column's title and content
      column.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.content}</p>
      `;

      // Append the column to the container
      servicesContainer.appendChild(column);
    });

    document.getElementById('title').textContent = title;
    document.getElementById('subtitle').textContent = subtitle;
    document.getElementById('services-title').textContent = columnSecTitle;

    // Access and process other data as needed
    const services = data.data.blocks.find((block) => block.Column_sectionTitle === 'Our Services');
    if (services) {
      // Process and update the HTML for the "Our Services" section
      console.log('Our Services:', services);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});



// // ... Previous code ...

// // Function to fetch data from the GraphQL API
// async function fetchData() {
//   try {
//     const response = await fetch(GRAPHQL_API_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         // You may need to add authentication headers if required
//         'Accept': 'application/json',
//       },
//       body: JSON.stringify({
//         query: GRAPHQL_QUERY,
//         variables: {
//           id: 'clmq1lfbxe82y0aupvn1v67g0', // Replace with the actual page ID
//           id2: 'clmq3y4gjfufq0aupq2uwddyx', // Replace with the actual ID
//           id_footer: 'clmq2kge5ev3a0aup6lpar8hb', // Replace with the actual ID
//           id_nav: 'clmq1jrrxe72z0aupxuz6gs89', // Replace with the actual ID
//         },
//       }),
//     });

//     const data = await response.json();
//     console.log(data);

//     // Access the title and subtitle from the GraphQL response
//     // const title = data.data.values.title;
//     const title = data.values.title;
//     // const subtitle = data.data.values.subtitle;
//     const subtitle = data.values.subtitle;

//     // Update the HTML content with the retrieved data
//     document.getElementById('title').textContent = title;
//     document.getElementById('subtitle').textContent = subtitle;

//     // Access and update other elements as needed
//     const servicesSection = document.querySelector('.services');
//     servicesSection.innerHTML = ''; // Clear any existing content

//     // const blocks = data.data.values.blocks;
//     const blocks = data.values.blocks;
//     blocks.forEach((block) => {
//       if (block.Column_sectionTitle === 'Our Services') {
//         const content = block.content;
//         const serviceItems = content.map((item) => {
//           return `
//             <div class="service-item">
//               <h3>${item.title}</h3>
//               <p>${item.content}</p>
//             </div>
//           `;
//         });
//         servicesSection.innerHTML = `
//           <h2>${block.Column_sectionTitle}</h2>
//           <div class="service-items">${serviceItems.join('')}</div>
//         `;
//       }
//     });

//     // Access and update other elements (e.g., logo carousel, footer) as needed

//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }

// // Call the fetchData function to load data when the page loads
// window.addEventListener('load', fetchData);
// }



// // ... Previous code ...

// // Function to fetch data from the GraphQL API
// async function fetchData() {
//   try {
//     const response = await fetch(GRAPHQL_API_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         // You may need to add authentication headers if required
//         'Accept': 'application/json',
//       },
//       body: JSON.stringify({
//         query: GRAPHQL_QUERY,
//         variables: {
//           id: 'clmq1lfbxe82y0aupvn1v67g0', // Replace with the actual page ID
//           id2: 'clmq3y4gjfufq0aupq2uwddyx', // Replace with the actual ID
//           id_footer: 'clmq2kge5ev3a0aup6lpar8hb', // Replace with the actual ID
//           id_nav: 'clmq1jrrxe72z0aupxuz6gs89', // Replace with the actual ID
//         },
//       }),
//     });

//     const data = await response.json();
//     console.log(data)
//     // Access the title and subtitle from the GraphQL response
//     // const title = data.data.values.title;
//     const title = data.values.title;
//     // const subtitle = data.data.values.subtitle;
//     const subtitle = data.values.subtitle;

    

//     // Update the HTML content with the retrieved data
//     document.getElementById('title').textContent = title;
//     document.getElementById('subtitle').textContent = subtitle;

//     // Access and update other elements as needed
//     const servicesSection = document.querySelector('.services');
//     servicesSection.innerHTML = ''; // Clear any existing content

//     const blocks = data.data.values.blocks;
//     blocks.forEach((block) => {
//       if (block.Column_sectionTitle === 'Our Services') {
//         const content = block.content;
//         const serviceItems = content.map((item) => {
//           return `
//             <div class="service-item">
//               <h3>${item.title}</h3>
//               <p>${item.content}</p>
//             </div>
//           `;
//         });
//         servicesSection.innerHTML = `
//           <h2>${block.Column_sectionTitle}</h2>
//           <div class="service-items">${serviceItems.join('')}</div>
//         `;
//       }
//     });

//     // Access and update other elements (e.g., logo carousel, footer) as needed

//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// }

// // Call the fetchData function to load data when the page loads
// window.addEventListener('load', fetchData);



// // // Function to fetch data from the GraphQL API
// // async function fetchData() {
// //   try {
// //     const response = await fetch(GRAPHQL_API_URL, {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         // You may need to add authentication headers if required
// //       },
// //       body: JSON.stringify({
// //         query: GRAPHQL_QUERY,
// //         variables: {
// //           // id: 'clmq1lfbxe82y0aupvn1v67g0', // Replace with the actual page ID

// //           id:"clmq1lfbxe82y0aupvn1v67g0", 
// //           id2: "clmq3y4gjfufq0aupq2uwddyx", 
// //           id_footer: "clmq2kge5ev3a0aup6lpar8hb", 
// //           id_nav: "clmq1jrrxe72z0aupxuz6gs89",
          
          
// //         },
// //       }),
// //     });

// //     const data = await response.json();

// //     console.log(data)


// //     // Access the title and subtitle from the GraphQL response
// //     const title = data.data.values.localizations[0].title;
// //     const subtitle = data.data.values.localizations[0].subtitle;

// //     // Update the HTML content with the retrieved data
// //     document.getElementById('title').textContent = title;
// //     document.getElementById('subtitle').textContent = subtitle;
// //   } catch (error) {
// //     console.error('Error fetching data:', error);
// //   }
// // }

// // // Call the fetchData function to load data when the page loads
// // window.addEventListener('load', fetchData);

