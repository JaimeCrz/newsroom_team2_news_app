import React, { Component } from "react";
import { Box, Grommet, Button, Image } from "grommet";
import { grommet } from "grommet/themes";
import axios from "axios";
import { connect } from "react-redux";

class ArticleList extends Component {
  componentDidMount() {
    axios.get("/articles").then(response => {
      this.props.dispatch({
        type: "ARTICLES",
        payload: { articleList: response.data }
      });
    }); debugger
  }

  async articleFetcher(event) {
    let id = event.target.dataset.id;
    let response = await axios.get(`/articles/${id}`);
    this.props.dispatch({
      type: "SHOW_ARTICLE",
      payload: { readArticle: response.data }
    });
  }

  render() {
    let articleDisplay;
    if (this.props.articleList !== []) {
      articleDisplay = this.props.articleList.map(article => {
        return (
          <div class="two column row">
            <Box
              direction="row"
              border={{ color: "#544C2F", size: "small" }}
              pad="medium"
              margin="medium"
              className="article"
              key={article.id}
              basis="1/2"
            >
              <div id={article.id} className="article-box">
                <div className="article-box">
                  <Image id="article-image" src={article.image}></Image>
                </div>
                <div className="feature-article">
                  <div className="article-headline">
                    <h2 id="title">{article.title}</h2>
                    <div className="article-teaser">
                      <p>{article.teaser}</p>
                    </div>
                  </div>
                </div>
                <Button
                  alignSelf="center"
                  id="read-more-button"
                  margin="small"
                  color="#7C8EA6"
                  data-id={article.id}
                  type="submit"
                  primary
                  label="Read More"
                  onClick={this.articleFetcher.bind(this)}
                ></Button>
                <p id="article-class">{article.article_class}</p>
              </div>
            </Box>
          </div>
        );
      });
    }
    return (
      <Grommet full theme={grommet}>
        <div class="ui stackable vertically divided grid">
          <div class="two column row">{articleDisplay}</div>{" "}
        </div>
      </Grommet>
    );
  }
}

const mapStateToProps = state => {
  return {
    articleList: state.articleList
  };
};

export default connect(mapStateToProps)(ArticleList);
