/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { Link , graphql } from "gatsby"
import { RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri"

import Layout from "../components/layout"
import PostCard from "../components/post-card"
import SEO from "../components/seo"

const styles = {
  pagination: {
    'a': {
      color: 'muted',
      '&.is-active': {
        color: 'text'
      },
      '&:hover': {
        color: 'text'
      }
    }
  }
}

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { template: { eq: "blog-post" } } }
      limit: $limit
      skip: $skip
		) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
						title
						featuredImage {
							childImageSharp {
								fluid(maxWidth: 540, maxHeight: 360, quality: 80) {
                  ...GatsbyImageSharpFluid
                  ...GatsbyImageSharpFluidLimitPresentationSize
                }
							}
						}
          }
        }
      }
    }
  }
`
const Pagination = (props) => (
  <div 
    className="pagination"
    sx={styles.pagination}
  >
    <ul>
      {!props.isFirst && (
        <li>
          <Link to={props.prevPage} rel="prev">
          <span className="icon -left"><RiArrowLeftLine/></span> Previous
          </Link>
        </li>
      )}
      {Array.from({ length: props.numPages }, (_, i) => (
        <li key={`pagination-number${i + 1}`} >
          <Link
            to={`${props.blogSlug}${i === 0 ? '' : i + 1}`}
            className={props.currentPage === i + 1 ? "is-active num" : "num"}
          >
            {i + 1}
          </Link>
        </li>
      ))}
      {!props.isLast && (
        <li>
          <Link to={props.nextPage} rel="next">
            Next <span className="icon -right"><RiArrowRightLine/></span>
          </Link>
        </li>
      )}
    </ul>
  </div>
)
class BlogIndex extends React.Component {
  render() {
    
    const { data } = this.props
    const { currentPage, numPages } = this.props.pageContext
    const blogSlug = '/blog/' 
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? blogSlug : blogSlug + (currentPage - 1).toString()
    const nextPage = blogSlug + (currentPage + 1).toString()

    const posts = data.allMarkdownRemark.edges
      .filter(edge => !!edge.node.frontmatter.date)
      .map(edge =>
        <PostCard key={edge.node.id} data={edge.node} />
      )
    let props = {
      isFirst,
      prevPage,
      numPages,
      blogSlug,
      currentPage,
      isLast,
      nextPage
    }
    
    return (
      
      <Layout className="blog-page">
        <SEO
          title={"Blog — Page " + currentPage + " of " + numPages}
          description={"my base blog page " + currentPage + " of " + numPages }
        />
        <h1>Welcome to my Blog!</h1>
        <h4>This was created to give you the highlights of current events in a concise manner while also giving you the resources to research it yourself and verify the facts. As an engineer, I sure do love my facts and I hope you do too!</h4>
        <h4>Feel free to give my articles some claps on <a href="https://willkencel.medium.com/" target="_blank" rel="noopener noreferrer">Medium</a></h4>
        <div className="grids col-1 sm-2 lg-3">
          {posts}
        </div>
        <Pagination {...props} />
      </Layout>
    )
  }
}

export default BlogIndex