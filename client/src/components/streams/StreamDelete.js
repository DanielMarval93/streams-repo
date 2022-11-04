import React, {useEffect} from "react";
import { connect } from "react-redux";
import { fetchStream, deleteStream } from "../../actions";
import Modal from "../Modal";
import history from "../../history";
import { Link } from "react-router-dom";


const StreamDelete = props =>{
    useEffect(() => {
        props.fetchStream(props.match.params.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])


    const renderContent = () =>{
        if (!props.stream) {
            return 'Are you sure you want to delete this stream?';
        };

        return `Are you sure you want to delete "${props.stream.title}"?`;
    }

    const onClick = () =>{
        props.deleteStream(props.match.params.id);
    };
    
    const renderActions = () =>{
        return(
            <React.Fragment>
                <button className="ui button negative" onClick={onClick}>Delete</button>
                <Link className="ui button" to='/' >Cancel</Link>
            </React.Fragment>
        );
    };


    return (
            <Modal 
                title="Delete Stream"
                content = {renderContent()}
                actions = {renderActions()}
                onDismiss = {() => history.push('/')}
            />
    );
};

const mapStateToProps=(state, ownProps) =>{
    return {stream: state.streams[ownProps.match.params.id]}
};

export default connect(mapStateToProps,{fetchStream, deleteStream})(StreamDelete);