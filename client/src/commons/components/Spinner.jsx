import React from 'react';
import '../styles/commons.style.css';

export default function Spinner() {
  return (
    <div class="w-100 vh-100 d-flex justify-content-center align-items-center">
      <button class="btn btn-secondary" type="button" disabled>
        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Loading...
      </button>
    </div>
  )
}
