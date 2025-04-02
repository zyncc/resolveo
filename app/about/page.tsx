import React from "react";

export default function page() {
  return (
    <div className="container mx-auto w-full flex flex-col gap-4 text-lg">
      <h1 className="mt-[100px] font-semibold text-2xl text-center">
        About us
      </h1>
      <p>
        At Resolveo, we believe that every student deserves a positive and
        supportive environment for learning and personal growth. Whether you’re
        facing an issue with accommodation, academics, administration, or any
        other aspect of student life, we’re here to help you get your voice
        heard and your problem resolved.
      </p>
      <br />
      <h1 className="font-semibold text-2xl text-center">
        What can you Report?
      </h1>
      <ul className="list-disc">
        <li>Students can use this platform to file complaints related to:</li>
        <li>
          Hostel/PG Issues: Poor living conditions, food quality, or safety
          concerns.
        </li>
        <li>
          Academic Grievances: Issues with teachers, unfair grading, or
          exam-related concerns.
        </li>
        <li>
          Administration Problems: Delays in services, unfriendly behavior, or
          mismanagement.
        </li>
        <li>
          Campus Safety: Bullying, harassment, or any form of discrimination.
        </li>
        <li>
          Health & Hygiene: Cleanliness of hostels, mess food quality, or
          sanitation problems.
        </li>
      </ul>
      <h1 className="font-medium text-xl">How It Works:</h1>
      <ol className="list-decimal">
        <li>
          Submit a Complaint: Fill out a simple form with your concern and all
          necessary details.
        </li>
        <li>Get Updates: Track the status of your complaint in real time.</li>
        <li>
          Resolution: We’ll work with the concerned authorities to ensure your
          issue is addressed promptly and fairly.
        </li>
      </ol>
      <h1 className="font-medium text-xl">Why Use Resolveo?</h1>
      <ul className="list-disc">
        <li>
          Confidentiality: Your information is secure and your identity will
          remain confidential if requested.
        </li>
        <li>
          Efficiency: We ensure that complaints are forwarded to the right
          people for quick resolution.
        </li>
        <li>
          Support: Our platform allows you to reach out for help, whether the
          issue is big or small.
        </li>
      </ul>
    </div>
  );
}
