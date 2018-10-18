select * from ttt_notes
inner join ttt_users on ttt_users.user_id = ttt_notes.user_id
where ttt_users.user_id = $1;