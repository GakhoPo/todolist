import React from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { Button, List, Input } from 'antd';

const TodoList = (props) => { 
    const { inputValue, list, changeInputValue, handleClick, handleDelete } = props;

    return ( 
        <div style={{marginTop:'10px', marginLeft:'10px'}}>
            <div>
                <Input placeholder="Basic usage" style={{width:"300px"}} value={inputValue} onChange={changeInputValue}/>
                <Button style={{marginBottom:'5px'}} type="primary" onClick={handleClick}>Submit</Button>
            </div>
            <List
                style={{width:'375px'}}
                bordered
                dataSource={list}
                renderItem={(item, index) => (
                    <List.Item onClick={() => {handleDelete(index)}} key={index}>
                        {index}: {item}
                    </List.Item>
                )}
            />  
        </div> );
    }

const mapStateToProps = (state) => {
    return {
        inputValue: state.inputValue,
        list: state.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeInputValue(e) {
            const action = {
                type: 'change_input_value',
                value: e.target.value
            };
            dispatch(action);
        },

        handleClick() {
            const action = {
                type: 'add_item'
            };
            dispatch(action);
        },

        handleDelete(index) {
            const action = {
                type: 'delete_item',
                index
            };
            dispatch(action);
        }
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);