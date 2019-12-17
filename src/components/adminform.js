import React from 'react';
import { Field, reduxForm } from 'redux-form';

const SimpleForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>GAME</label>
        <div>
          <Field
            name="Game"
            component="input"
            type="text"
            placeholder="Name"
          />
        </div>
      </div>
      <div>
        <label>Price</label>
        <div>
          <Field
            name="Price"
            component="input"
            type="text"
            placeholder="Price"
          />
        </div>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'simple',
})(SimpleForm);