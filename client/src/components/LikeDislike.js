import React, { useContext, useState } from 'react';
import { Tooltip, Icon } from 'antd';
import { ThemeContext } from '../App';

export default function LikeDislike(props) {
	const context = useContext(ThemeContext);
	const { voteProperty, setVoteProperty } = context;
	const [ LikeAction, setLikeAction ] = useState(null);
	const [ DislikeAction, setDislikeAction ] = useState(null);
	console.log(props);

	const likeHandler = () => {
		if (LikeAction === 'liked') {
			setLikeAction('');
			setVoteProperty({ ...voteProperty, image: props.desc });
		} else {
			setLikeAction('liked');
			setVoteProperty({ ...voteProperty, image: props.desc });
		}
	};
	const dislikeHandler = () => {
		if (DislikeAction === 'disliked') {
			setDislikeAction('');
		} else {
			setDislikeAction('disliked');
		}
	};

	return (
		<React.Fragment>
			<span key='comment-basic-like'>
				<Tooltip title='Like'>
					<Icon type='like' theme={LikeAction === 'liked' ? 'filled' : 'outlined'} onClick={likeHandler} />
				</Tooltip>
				<span style={{ paddingLeft: '8px', cursor: 'auto' }}>Like</span>
			</span>&nbsp;
			<span key='comment-basic-dislike'>
				<Tooltip title='Dislike'>
					<Icon type='dislike' theme={DislikeAction === 'disliked' ? 'filled' : 'outlined'} onClick={dislikeHandler} />
				</Tooltip>
				<span style={{ paddingLeft: '8px', cursor: 'auto' }}>Dislike</span>
			</span>
		</React.Fragment>
	);
}
