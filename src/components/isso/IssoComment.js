import React, { Component } from 'react';

import Identicons from 'identicons-react';
import moment from 'moment'

class IssoComment extends Component {
	render() {
		return (
			<div className={this.props.comment.likes === 0 ? "isso-comment isso-no-votes" : "isso-comment"}>
				<div className="avatar">
					<Identicons id={this.props.comment.author ? this.props.comment.author : this.props.comment.hash} width={48} size={5} />
				</div>
				<div className="text-wrapper">
					<div className="isso-comment-header">
						<span className="author">{this.props.comment.author ? this.props.comment.author : "Anonymous"}</span>
						<span className="spacer">•</span>
						<a href="#isso-1" className="permalink" data-ytta-id="-">
							<time>{moment.unix(this.props.comment.created).fromNow()}</time>
						</a>
						<span className="note"></span>
					</div>
					<div className="text">
						{this.props.comment.text}
					</div>
					<div className="isso-comment-footer">
						<span className="votes">{this.props.comment.likes === 0 ? "" : this.props.comment.likes}</span>
						<a href="#asdf" className="upvote">
							<span className="icon icon-chevron-up"></span>
						</a>
						<span className="spacer">|</span>
						<a href="#asdf" className="downvote" data-ytta-id="-">
							<span className="icon icon-chevron-down"></span>
						</a>
						<a href="#asdf" className="reply" data-ytta-id="-">Reply</a>
					</div>
					<div className="isso-follow-up">
						{this.props.comment.replies ? this.props.comment.replies.map(function(comment, i){
							return <IssoComment comment={comment} key={i} />
						}) : ""}
					</div>
				</div>
			</div>
		);
	}
}

export default IssoComment;